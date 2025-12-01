/*
  Warnings:

  - A unique constraint covering the columns `[userprofessorsubject_id]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subject_userprofessorsubject_id_key" ON "Subject"("userprofessorsubject_id");
