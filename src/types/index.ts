// Define app-wide types

export interface Surah {
  id: string;
  name: string;
  memorizedDate: string; // ISO string format
  lastReviewed?: string; // ISO string format
  nextReviewDate?: string; // ISO string format
  reviewCount: number;
}

export type ReviewInterval = 1 | 3 | 7 | 14 | 30 | 90;
