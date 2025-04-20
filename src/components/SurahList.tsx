import { useState } from "react";
import { Trash2, CheckCircle, ChevronLeft } from "lucide-react";
import { Surah } from "../types";
import { formatDate } from "../utils/formatDate";
import { needsReviewToday } from "../utils/spacedRepetition";
import { SurahDialog } from "./SurahDialog";

interface SurahListProps {
  surahs: Surah[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SurahList({ surahs, onComplete, onDelete }: SurahListProps) {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const surahsForReview = surahs.filter(needsReviewToday);

  if (surahs.length === 0) {
    return (
      <div className="p-8 text-lg text-center border border-gray-500 rounded-md">
        أهلا بك في "حافظ". التطبيق بكل اختصار يقوم بمساعدتك في مراجعة القرءان،
        لأنه كما تعلم المراجعة مهمة جدا جدا لحفاظ القرءان الكريم، لذا قمت بصناعة
        هذا التطبيق. ما عليك سوى إضافة السور التي حفظتها وسيقوم التطبيق بعرض
        السور المراد مراجعتها كل يوم
      </div>
    );
  }

  const handleSurahClick = (surah: Surah) => {
    setSelectedSurah(surah);
  };

  return (
    <div className="space-y-6">
      <SurahDialog
        surah={selectedSurah!}
        isOpen={!!selectedSurah}
        onClose={() => setSelectedSurah(null)}
        onCompelete={onComplete}
      />

      {surahsForReview.length > 0 && (
        <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
          <h2 className="mb-4 text-xl font-semibold text-yellow-800">
            السور المطلوب مراجعتها اليوم
          </h2>
          <div className="space-y-3">
            {surahsForReview.map((surah) => (
              <div
                key={surah.id}
                onClick={() => handleSurahClick(surah)}
                className="flex items-center justify-between p-4 transition-shadow bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md group"
              >
                <div>
                  <h3 className="text-lg font-medium">{surah.name}</h3>
                  <p className="text-sm text-gray-600">
                    آخر مراجعة:{" "}
                    {formatDate(surah.lastReviewed || surah.memorizedDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onComplete(surah.id);
                    }}
                    className="text-emerald-600 hover:text-emerald-700"
                    title="اكتمال المراجعة"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(surah.id);
                    }}
                    className="text-red-600 hover:text-red-700"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
                  <ChevronLeft
                    size={20}
                    className="text-gray-400 transition-opacity opacity-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-xl font-semibold">جميع السور المحفوظة</h2>
        <div className="space-y-3">
          {surahs.map((surah) => (
            <div
              key={surah.id}
              onClick={() => handleSurahClick(surah)}
              className="flex items-center justify-between p-4 transition-shadow bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md group"
            >
              <div>
                <h3 className="text-lg font-medium">{surah.name}</h3>
                <p className="text-sm text-gray-600">
                  تاريخ الحفظ: {formatDate(surah.memorizedDate)}
                </p>
                <p className="text-sm text-gray-600">
                  عدد المراجعات: {surah.reviewCount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(surah.id);
                  }}
                  className="text-red-600 hover:text-red-700"
                  title="حذف"
                >
                  <Trash2 size={20} />
                </button>
                <ChevronLeft
                  size={20}
                  className="text-gray-400 transition-opacity opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
