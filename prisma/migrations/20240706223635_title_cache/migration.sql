-- CreateTable
CREATE TABLE "omdbTitle" (
    "imdbID" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "omdbTitle_pkey" PRIMARY KEY ("imdbID")
);
