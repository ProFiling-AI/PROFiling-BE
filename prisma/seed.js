import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const seed = async () => {
  try {
    // 🔐 비밀번호 해싱
    const hashedPassword = await bcrypt.hash("testpassword123", 10); // 10은 saltRounds
    // 1. User
    const user = await prisma.user.create({
      data: {
        name: "김프로",
        school: "성신여자대학교",
        major: "AI",
        sub_major: "Software",
        grade: 3,
        email: "example@sungshin.ac.kr",
        password: hashedPassword,
        agreed_privacy: true,
        agreed_at: new Date(),
      },
    });

    // 2. Plan + UserPlanStatus
    const plan = await prisma.plan.create({
      data: {
        name: "Free",
        monthly_quota: 1000,
        price: 0,
        description: "기본 요금제",
      },
    });

    await prisma.userPlanStatus.create({
      data: {
        user_id: user.id,
        plan_id: plan.id,
        is_active: true,
      },
    });

    // 3. Subject
    const subject = await prisma.subject.create({
      data: {
        user_id: user.id,
        subject_name: "AI 기초",
        deleted_at: new Date("2099-12-31"),
      },
    });

    // 4. Professor + ProfessorCourse + Review/Exam
    const professor = await prisma.professor.create({
      data: {
        name: "이교수",
        gender: "MALE",
        department: "컴퓨터공학과",
        subject_name: "AI 기초",
        school: "성신여자대학교",
      },
    });

    const professorCourse = await prisma.professorCourse.create({
      data: {
        professor_id: professor.id,
        subject_name: "AI 기초",
        school: "성신여자대학교",
      },
    });

    await prisma.professorCourseReview.create({
      data: {
        professor_course_id: professorCourse.id,
        content: "정말 친절한 교수님이에요!",
      },
    });

    await prisma.professorCourseExam.create({
      data: {
        professor_course_id: professorCourse.id,
        content: "기말고사는 개념 위주로 나왔어요.",
      },
    });

    await prisma.userProfessorSubject.create({
      data: {
        user_id: user.id,
        subject_id: subject.id,
        professor_course_id: professorCourse.id,
      },
    });

    // 5. Recording
    const recording = await prisma.recording.create({
      data: {
        user_id: user.id,
        subject_id: subject.id,
        title: "1주차 강의",
        started_at: new Date(),
        ended_at: new Date(),
        audio_path: "audio/lecture1.mp3",
      },
    });

    // 6. Summary
    const summary = await prisma.summary.create({
      data: {
        recording_id: recording.id,
        content: "AI의 정의와 역사",
      },
    });

    // 7. Bookmark, Memo, Highlight
    await prisma.bookmark.create({
      data: {
        recording_id: recording.id,
        summary_id: summary.id,
        timestamp: 45.5,
      },
    });

    await prisma.memo.create({
      data: {
        recording_id: recording.id,
        summary_id: summary.id,
        title: "중요 포인트",
        content: "AI는 인간의 사고방식을 모방한다.",
      },
    });

    await prisma.highlight.create({
      data: {
        recording_id: recording.id,
        section: "00:45 ~ 01:00",
        color: "YELLOW",
      },
    });

    // 8. Schedule
    await prisma.schedule.create({
      data: {
        user_id: user.id,
        recording_id: recording.id,
        title: "복습 스케줄",
        start: new Date(),
        end: new Date(new Date().getTime() + 1000 * 60 * 60),
        allDay: false,
        location: "도서관",
        memo: "퀴즈까지 확인",
        alarm_option: "BEFORE_30_MIN",
      },
    });

    // 9. Notification
    await prisma.notification.create({
      data: {
        user_id: user.id,
        recording_id: recording.id,
        event_id: 1,
        type: "REVIEW",
        message: "복습 알림: AI 기초 1주차",
      },
    });

    // 10. Trash
    await prisma.trash.create({
      data: {
        user_id: user.id,
        data_type: "Recording",
        original_id: recording.id,
        original_data: { message: "삭제된 강의입니다." },
      },
    });

    // 11. UserVersionInfo
    await prisma.userVersionInfo.create({
      data: {
        user_id: user.id,
        latest: "1.2.0",
        min_required: "1.0.0",
        released_at: new Date(),
      },
    });

    console.log("✅ 전체 Seed 데이터 생성 완료!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// 실행
seed();
