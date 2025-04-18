// LocalStorage utilities for saving/loading data

import { Surah } from "../types";

const STORAGE_KEY = "hafiz_app_data";

/**
 * Load all surahs from localStorage
 */
export const loadSurahs = (): Surah[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load surahs from storage", error);
    return [];
  }
};

/**
 * Save all surahs to localStorage
 */
export const saveSurahs = (surahs: Surah[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surahs));
  } catch (error) {
    console.error("Failed to save surahs to storage", error);
  }
};

/**
 * Add a new surah to storage
 */
export const addSurah = (surah: Surah): Surah[] => {
  const surahs = loadSurahs();
  const updatedSurahs = [...surahs, surah];
  saveSurahs(updatedSurahs);
  return updatedSurahs;
};

/**
 * Update a surah in storage
 */
export const updateSurah = (updatedSurah: Surah): Surah[] => {
  const surahs = loadSurahs();
  const updatedSurahs = surahs.map((surah) =>
    surah.id === updatedSurah.id ? updatedSurah : surah
  );
  saveSurahs(updatedSurahs);
  return updatedSurahs;
};

/**
 * Delete a surah from storage
 */
export const deleteSurah = (id: string): Surah[] => {
  const surahs = loadSurahs();
  const updatedSurahs = surahs.filter((surah) => surah.id !== id);
  saveSurahs(updatedSurahs);
  return updatedSurahs;
};
