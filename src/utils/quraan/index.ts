const apiBase = "https://api.alquran.cloud/v1";

interface SurahFetchResult {
  data: {
    ayahs: {
      number: number;
      text: string;
    }[];
  };
}

const Quraan = {
  getSurah: async (surahId: number) => {
    const res = await fetch(`${apiBase}/surah/${surahId}/quran-uthmani`);

    const result: SurahFetchResult = await res.json();

    return result.data.ayahs.map((ayah) => ayah.text);
  },
};

export default Quraan;
