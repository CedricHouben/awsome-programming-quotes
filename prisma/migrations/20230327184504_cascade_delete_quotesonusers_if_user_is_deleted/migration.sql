-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuotesOnUsers" (
    "quoteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("quoteId", "userId"),
    CONSTRAINT "QuotesOnUsers_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuotesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QuotesOnUsers" ("createdAt", "quoteId", "updatedAt", "userId") SELECT "createdAt", "quoteId", "updatedAt", "userId" FROM "QuotesOnUsers";
DROP TABLE "QuotesOnUsers";
ALTER TABLE "new_QuotesOnUsers" RENAME TO "QuotesOnUsers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
