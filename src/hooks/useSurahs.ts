import { useState, useEffect } from "react";
import { Surah } from "../types";
import { loadSurahs, saveSurahs } from "../utils/storage";
import { calculateNextReviewDate } from "../utils/spacedRepetition";
import { getTodayISO } from "../utils/formatDate";

export function useSurahs() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  // Load surahs from localStorage on initial render
  useEffect(() => {
    setSurahs(loadSurahs());
    setLoading(false);
  }, []);

  // Add a new surah
  const addSurah = (name: string, memorizedDate: string = getTodayISO()) => {
    console.log(name);
    const newSurah: Surah = {
      id: crypto.randomUUID(),
      name,
      memorizedDate,
      reviewCount: 0,
      lastReviewed: memorizedDate,
    };

    // Calculate next review date
    const nextReviewDate = calculateNextReviewDate(newSurah);
    newSurah.nextReviewDate = nextReviewDate.toISOString();

    setSurahs((surahs) => {
      const updatedSurahs = [...surahs, newSurah];
      saveSurahs(updatedSurahs);
      return updatedSurahs;
    });

    return newSurah;
  };

  // Complete a review for a surah
  const completeReview = (id: string) => {
    const updatedSurahs = surahs.map((surah) => {
      if (surah.id === id) {
        const updatedSurah = {
          ...surah,
          lastReviewed: new Date().toISOString(),
          reviewCount: surah.reviewCount + 1,
        };

        const nextReviewDate = calculateNextReviewDate(updatedSurah);
        updatedSurah.nextReviewDate = nextReviewDate.toISOString();

        return updatedSurah;
      }
      return surah;
    });

    setSurahs(updatedSurahs);
    saveSurahs(updatedSurahs);
  };

  // Delete a surah
  const deleteSurah = (id: string) => {
    const updatedSurahs = surahs.filter((surah) => surah.id !== id);
    setSurahs(updatedSurahs);
    saveSurahs(updatedSurahs);
  };

  return {
    surahs,
    loading,
    addSurah,
    completeReview,
    deleteSurah,
  };
}
