-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactNo" INTEGER,
ADD COLUMN     "cv" TEXT,
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "emailVerifyStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "nameWithInitials" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "universityID" TEXT;
