/*
  Warnings:

  - You are about to drop the column `summary_id` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `summary_id` on the `Memo` table. All the data in the column will be lost.
  - You are about to drop the column `stt_result` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the `Summary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "Memo" DROP CONSTRAINT "Memo_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_recording_id_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "summary_id";

-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "summary_id";

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "stt_result";

-- DropTable
DROP TABLE "Summary";
