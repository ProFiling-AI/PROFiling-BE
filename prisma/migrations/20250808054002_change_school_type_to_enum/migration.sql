/*
  Warnings:

  - Changed the type of `school` on the `Professor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `school` on the `ProfessorCourse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

UPDATE "Professor" SET "school" = 
  CASE "school"
    WHEN '성신여자대학교' THEN 'SUNGSHIN'
    ELSE NULL
  END;

UPDATE "ProfessorCourse" SET "school" = 
  CASE "school"
    WHEN '성신여자대학교' THEN 'SUNGSHIN'
    ELSE NULL
  END;

-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "school" TYPE "School" USING "school"::"School";

-- AlterTable
ALTER TABLE "ProfessorCourse" ALTER COLUMN "school" TYPE "School" USING "school"::"School";