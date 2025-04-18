// Spaced repetition algorithm utility

import { Surah, ReviewInterval } from "../types";

// Intervals in days for spaced repetition
const INTERVALS: ReviewInterval[] = [1, 3, 7, 14, 30, 90];

/**
 * Calculate the next review date based on review count
 */
export const calculateNextReviewDate = (surah: Surah): Date => {
  // Get the appropriate interval based on review count (capped at max interval)
  const intervalIndex = Math.min(surah.reviewCount, INTERVALS.length - 1);
  const interval = INTERVALS[intervalIndex];

  // Calculate next review date
  const lastReviewDate = surah.lastReviewed
    ? new Date(surah.lastReviewed)
    : new Date(surah.memorizedDate);

  const nextDate = new Date(lastReviewDate);
  nextDate.setDate(lastReviewDate.getDate() + interval);

  return nextDate;
};

/**
 * Check if a surah needs review today
 */
export const needsReviewToday = (surah: Surah): boolean => {
  if (!surah.nextReviewDate) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reviewDate = new Date(surah.nextReviewDate);
  reviewDate.setHours(0, 0, 0, 0);

  return reviewDate <= today;
};

/**
 * Get all surahs that need review today
 */
export const getSurahsForReview = (surahs: Surah[]): Surah[] => {
  return surahs.filter(needsReviewToday);
};
