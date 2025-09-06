import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    recording_id: { type: Number, required: true, index: true }, // Postgres Recording.id 참조
    content: { type: String, required: true }, // AI가 만든 요약 결과
    model_name: { type: String }, // 어떤 AI 모델로 만들었는지 (예: gpt-4o-mini)
    created_at: { type: Date, default: Date.now },
  },
  { collection: "summaries" } // MongoDB 컬렉션 이름 고정
);

export default mongoose.model("Summary", summarySchema);
