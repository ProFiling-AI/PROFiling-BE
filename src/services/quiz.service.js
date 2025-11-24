// import quizRepository from "../repositories/quiz.repository.js";
// import OpenAI from "openai";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import quizError from "../errors/quiz.error";
// import quizDto from "../dtos/quiz.dto.js";

// /** ---------------- S3 helpers ---------------- **/
// function parseS3Uri(stt_path) {
//   // 허용: "s3://bucket/key" 또는 "https://bucket.s3.amazonaws.com/key"
//   if (stt_path.startsWith("s3://")) {
//     const no_prefix = stt_path.replace("s3://", "");
//     const first_slash = no_prefix.indexOf("/");
//     return {
//       bucket: no_prefix.slice(0, first_slash),
//       key: no_prefix.slice(first_slash + 1),
//     };
//   }
//   // https URL일 경우 대략적으로 파싱
//   const u = new URL(stt_path);
//   const host = u.hostname; // e.g., my-bucket.s3.amazonaws.com
//   const bucket = host.split(".")[0];
//   const key = u.pathname.replace(/^\//, "");
//   return { bucket, key };
// }

// async function streamToString(stream) {
//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
//   }
//   return Buffer.concat(chunks).toString("utf-8");
// }

// async function fetchTranscriptFromS3(stt_path) {
//   const { bucket, key } = parseS3Uri(stt_path);
//   const s3 = new S3Client({
//     region:
//       process.env.AWS_REGION ||
//       process.env.AWS_DEFAULT_REGION ||
//       "ap-northeast-2",
//     credentials: process.env.AWS_ACCESS_KEY_ID
//       ? {
//           accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//           secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//           sessionToken: process.env.AWS_SESSION_TOKEN,
//         }
//       : undefined,
//   });
//   const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
//   return await streamToString(res.Body);
// }

// /** ---------------- OpenAI JSON Schema (OX 10문항) ---------------- **/
// const OX_JSON_SCHEMA = {
//   type: "object",
//   properties: {
//     title: { type: "string" },
//     quiz_type: { type: "string", enum: ["OX", "OXQUIZ"] },
//     questions: {
//       type: "array",
//       minItems: 10,
//       maxItems: 10,
//       items: {
//         type: "object",
//         properties: {
//           stem: { type: "string" },
//           explanation: { type: "string" },
//           score: { type: "integer", const: 10 },
//         },
//         required: ["stem", "explanation", "score"],
//         additionalProperties: false,
//       },
//     },
//   },
//   required: ["title", "quiz_type", "questions"],
//   additionalProperties: false,
// };

// /** ---------------- Main: generateQuizByAI ---------------- **/
// const generateQuizByAI = async (user_id, recording_id, quiz_type, title) => {
//   try {
//     const openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_OPENAI_API_KEY,
//     });

//     // 0) recording_id로 STT_path 조회
//     const recording = await quizRepository.getRecordingById(recording_id);
//     if (!recording || !recording.STT_path) {
//       throw new quizError.NoSSTPathError("Error on finding STT path");
//     }

//     // 1) S3에서 전사본 다운로드
//     const transcript = await fetchTranscriptFromS3(recording.STT_path);

//     // 2) OpenAI 호출 (구조화 출력 강제)
//     const instructions = `
//         당신은 강의 전사본을 바탕으로 OX 퀴즈 10문항을 생성하는 조교입니다.
//         규칙:
//         - 모든 출력은 지정된 JSON 스키마만 따릅니다(추가 텍스트 금지).
//         - 한국어로 작성합니다.
//         - 각 문항은 강의/전사본의 핵심 사실을 검증하는 진술(stem) 형태로 만듭니다.
//         - explanation에는 왜 O 또는 X인지 간단히 근거를 씁니다(1~2문장).
//         - 항상 정확히 10문항, 각 score는 10점입니다.
//         - 중복/동어반복 금지, 서로 다른 주제를 골고루 커버하세요.
//     `;

//     const desired_quiz_type_out = quiz_type === "OX" ? "OXQUIZ" : quiz_type;

//     const response = await openai.responses.create({
//       model: "gpt-5-nano",
//       instructions,
//       input: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: `제목: ${title}` },
//             { type: "text", text: `유형: ${desired_quiz_type_out}` },
//             { type: "text", text: `전사본:\n${transcript}` },
//           ],
//         },
//       ],
//       response_format: {
//         type: "json_schema",
//         json_schema: OX_JSON_SCHEMA,
//         strict: true,
//       },
//       store: false,
//     });

//     const json_text =
//       response.output_text ??
//       JSON.stringify(response.output?.[0]?.content?.[0]?.text ?? "{}");
//     const parsed =
//       typeof json_text === "string" ? JSON.parse(json_text) : json_text;

//     const ai_questions = Array.isArray(parsed?.questions)
//       ? parsed.questions
//       : [];
//     if (ai_questions.length !== 10) {
//       throw new quizError.QuestionLessThan10Error(
//         "Created less than 10 questions"
//       );
//     }

//     // 3) 저장
//     const { quiz, questions: saved_questions } =
//       await quizRepository.createQuizWithAI({
//         user_id,
//         recording_id,
//         quiz_type, // DB enum은 "OX"로 저장
//         title: parsed?.title || title,
//         questions: ai_questions.map((q) => ({
//           stem: q.stem,
//           explanation: q.explanation,
//           score: q.score ?? 10,
//           blank_answer: null,
//         })),
//       });

//     return quizDto.resultQuizDto(quiz, saved_questions, desired_quiz_type_out);
//   } catch (error) {
//     throw new quizError.CreateQuestionError("Error on creating quiz");
//   }
// };

// export default { generateQuizByAI };
