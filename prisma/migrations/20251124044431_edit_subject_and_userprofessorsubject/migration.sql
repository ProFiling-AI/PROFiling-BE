/*
  Warnings:

  - You are about to drop the column `subject_id` on the `UserProfessorSubject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfessorSubject" DROP CONSTRAINT "UserProfessorSubject_subject_id_fkey";

-- DropIndex
DROP INDEX "UserProfessorSubject_user_id_subject_id_key";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "userprofessorsubject_id" INTEGER;

-- AlterTable
ALTER TABLE "UserProfessorSubject" DROP COLUMN "subject_id";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userprofessorsubject_id_fkey" FOREIGN KEY ("userprofessorsubject_id") REFERENCES "UserProfessorSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
