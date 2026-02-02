/*
  Warnings:

  - You are about to drop the column `description` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `description_en` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_fa` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_fa" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "yearsOfExperience" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("categoryId", "id", "image", "level", "name", "status", "yearsOfExperience") SELECT "categoryId", "id", "image", "level", "name", "status", "yearsOfExperience" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
