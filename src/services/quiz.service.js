import quizRepository from "../repositories/quiz.repository.js";
import OpenAI from "openai";
import quizError from "../errors/quiz.error.js";
import quizDto from "../dtos/quiz.dto.js";
import { getObjectAsString } from "../aws/s3.js";
import fs from "fs";

/** ---------------- OpenAI JSON Schema (OX 10문항) ---------------- **/
const OX_JSON_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    quiz_type: { type: "string", enum: ["OX", "OXQUIZ"] },
    questions: {
      type: "array",
      minItems: 10,
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          stem: { type: "string" },
          explanation: { type: "string" },
          score: { type: "integer", const: 10 },
          answer: {
            type: "string",
            enum: ["O", "X"],
          },
        },
        required: ["stem", "explanation", "score", "answer"],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "quiz_type", "questions"],
  additionalProperties: false,
};

/** ---------------- Main: generateQuizByAI ---------------- **/
const generateQuizByAI = async (user_id, recording_id, quiz_type, title) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // recording_id로 STT_path 조회
    const recording = await quizRepository.getRecordingById(recording_id);
    if (!recording || !recording.stt_path) {
      throw new quizError.NoSSTPathError("Error on finding STT path");
    }

    const key = recording.stt_path;

    // S3에서 전사본 다운로드
    const transcript = await getObjectAsString(key);

    // OpenAI 호출용 프롬프트
    const instructions = `
        당신은 강의 전사본을 바탕으로 OX 퀴즈 10문항을 생성하는 조교입니다.
        규칙:
        - 모든 출력은 지정된 JSON 스키마만 따릅니다(추가 텍스트 금지).
        - 한국어로 작성합니다.
        - 각 문항은 강의/전사본의 핵심 사실을 검증하는 진술(stem) 형태로 만듭니다.
        - explanation에는 왜 O 또는 X인지 간단히 근거를 씁니다(1~2문장).
        - 각 문항에는 정답 answer 필드를 포함합니다. ("O" 또는 "X")
        - 항상 정확히 10문항, 각 score는 10점입니다.
        - 중복/동어반복 금지, 서로 다른 주제를 골고루 커버하세요.
        `;

    const desired_quiz_type_out =
      quiz_type === "OX" ? "OXQUIZ" : quiz_type || "OXQUIZ";
    const quiz_type_for_db = desired_quiz_type_out;

    // OpenAI Responses API 호출
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      instructions,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: `제목: ${title}` },
            { type: "input_text", text: `유형: ${desired_quiz_type_out}` },
            { type: "input_text", text: `전사본:\n${transcript}` },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "ox_quiz_schema",
          schema: OX_JSON_SCHEMA,
          strict: true,
        },
      },
      store: false,
    });

    // 모의 버전용
    // const raw = fs.readFileSync("./test/mock_response.json", "utf-8");
    // const response = JSON.parse(raw);

    let jsonText = "{}";

    if (typeof response.output_text === "string") {
      jsonText = response.output_text;
    } else {
      const messageBlock = response.output?.find(
        (block) => block.type === "message"
      );
      const textContent = messageBlock?.content?.find(
        (c) => c.type === "output_text"
      );
      if (textContent && typeof textContent.text === "string") {
        jsonText = textContent.text;
      }
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      console.error("JSON parsing error:", e);
      console.error("Raw text that failed:", jsonText);
      throw new quizError.JSONParsingError("Error on parsing JSON");
    }

    const ai_questions = Array.isArray(parsed.questions)
      ? parsed.questions
      : [];

    if (ai_questions.length !== 10) {
      throw new quizError.QuestionLessThan10Error(
        "Created less than 10 questions"
      );
    }

    // 저장
    const { quiz, questions: saved_questions } =
      await quizRepository.createQuizWithQuestionsRepo({
        user_id,
        recording_id,
        quiz_type: quiz_type_for_db, // "OXQUIZ"
        title: parsed?.title || title,
        questions: ai_questions.map((q) => ({
          stem: q.stem,
          explanation: q.explanation,
          score: q.score ?? 10,
          blank_answer: null,
          isCorrectO: q.answer === "O",
        })),
      });

    return quizDto.resultQuizDto(quiz, saved_questions, desired_quiz_type_out);
  } catch (error) {
    throw new quizError.CreateQuestionError("Error on creating quiz");
  }
};

export default { generateQuizByAI };
