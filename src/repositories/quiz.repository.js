// import { prisma } from "../db.config.js";
// import quizError from "../errors/quiz.error.js";

// // recording_id별 attempt 번호 계산
// async function computeNextAttempt(tx, user_id, recording_id) {
//   const agg = await tx.quiz.aggregate({
//     where: { user_id: user_id, recording_id: recording_id },
//     _max: { attempt: true },
//   });
//   return (agg._max.attempt ?? 0) + 1;
// }

// export async function createQuizWithQuestionsRepo(
//   input /* AIGeneratedQuizInput */
// ) {
//   const { user_id, recording_id, quiz_type, title, questions = [] } = input;

//   if (!questions.length) {
//     throw new quizError.CreateQuestionError("Error on creating questions");
//   }

//   return await prisma.$transaction(async (tx) => {
//     // 1) attempt 번호
//     const attempt = await computeNextAttempt(tx, user_id, recording_id);

//     // 2) Quiz 생성
//     const quiz = await tx.quiz.create({
//       data: {
//         user_id: user_id,
//         recording_id: recording_id,
//         type: quiz_type,
//         title: title,
//         attempt,
//       },
//     });

//     // 3) Question 생성
//     const created_questions = [];
//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];

//       const creating_question = await tx.question.create({
//         data: {
//           quiz_id: quiz.id,
//           stem: q.stem,
//           explanation: q.explanation ?? "",
//           blank_answer: quiz_type === "CLOZE" ? q.correct_answer ?? null : null,
//         },
//       });

//       if (quiz_type === "OXQUIZ") {
//         // OX: 두 개 보기 생성
//         const is_O = q.isCorrectO === true;
//         await tx.quizChoice.createMany({
//           data: [
//             {
//               question_id: creating_question.id,
//               content: "O",
//               is_correct: is_O ? true : false,
//             },
//             {
//               question_id: creating_question.id,
//               content: "X",
//               is_correct: is_O ? false : true,
//             },
//           ],
//         });
//       }
//       // CLOZE는 보기 없음, 정답은 blank_answer에 저장

//       created_questions.push(creating_question);
//     }

//     return { quiz, questions: created_questions };
//   });
// }
