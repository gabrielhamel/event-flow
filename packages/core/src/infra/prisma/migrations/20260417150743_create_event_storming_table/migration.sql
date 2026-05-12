-- CreateTable
CREATE TABLE "event_storming" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" BYTEA,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_storming_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_storming" ADD CONSTRAINT "event_storming_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
