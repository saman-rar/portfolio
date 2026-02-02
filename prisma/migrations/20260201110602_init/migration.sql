/*
  Warnings:

  - Added the required column `description` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "yearsOfExperience" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("categoryId", "id", "level", "name", "status", "yearsOfExperience") SELECT "categoryId", "id", "level", "name", "status", "yearsOfExperience" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
