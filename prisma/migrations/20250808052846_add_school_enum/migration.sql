/*
  Warnings:

  - Changed the type of `school` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "School" AS ENUM ('KAYWON', 'SEOULARTS', 'SWC', 'GACHON', 'CATHOLIC', 'KONKUK', 'KYOUNGGI', 'KNU', 'KHU', 'KOREA', 'GIST', 'KOOKMIN', 'DANKOOK', 'DUKSUNG', 'DONGDUK', 'DONGGUK', 'MJU', 'SANGMYUNG', 'SOGANG', 'SEOULTECH', 'SNU', 'UOS', 'SWU', 'SKKU', 'SJU', 'SOOKMYUNG', 'SOONGSIL', 'SUNGSHIN', 'AJOU', 'YOUNSEI', 'YNU', 'YIU', 'EWHAIN', 'INHA', 'JEJUNU', 'CAU', 'POSTECH', 'KAIST', 'KARTS', 'HUFS', 'KAU', 'HANSUNG', 'HANYANG', 'HONGIK');

UPDATE "User" SET "school" = 
  CASE "school"
    WHEN '성신여자대학교' THEN 'SUNGSHIN'
    ELSE NULL
  END;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "school" TYPE "School" USING "school"::"School";

