-- CreateTable
CREATE TABLE "Meta" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'title',
    "description" TEXT NOT NULL DEFAULT 'description',
    "keywords" TEXT[] DEFAULT ARRAY['keyword']::TEXT[],

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meta_name_key" ON "Meta"("name");
