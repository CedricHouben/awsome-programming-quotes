-- CreateTable
CREATE TABLE "_QuoteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_QuoteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuoteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteToUser_AB_unique" ON "_QuoteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteToUser_B_index" ON "_QuoteToUser"("B");
