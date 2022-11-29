-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'title',
    "description" TEXT NOT NULL DEFAULT 'description',
    "keywords" TEXT[] DEFAULT ARRAY['keyword']::TEXT[],
    "content" JSONB[] DEFAULT ARRAY['{"tag": "p", "text": "paragraph"}']::JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
