import { Trash2, CheckCircle } from "lucide-react";
import { Surah } from "../types";
import { formatDate } from "../utils/formatDate";
import { needsReviewToday } from "../utils/spacedRepetition";

interface SurahListProps {
  surahs: Surah[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SurahList({ surahs, onComplete, onDelete }: SurahListProps) {
  const surahsForReview = surahs.filter(needsReviewToday);

  if (surahs.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        لم تقم بإضافة أي سورة بعد
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {surahsForReview.length > 0 && (
        <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
          <h2 className="mb-4 text-xl font-semibold text-yellow-800">
            السور المطلوب مراجعتها اليوم
          </h2>
          <div className="space-y-3">
            {surahsForReview.map((surah) => (
              <div
                key={surah.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{surah.name}</h3>
                  <p className="text-sm text-gray-600">
                    آخر مراجعة:{" "}
                    {formatDate(surah.lastReviewed || surah.memorizedDate)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onComplete(surah.id)}
                    className="text-emerald-600 hover:text-emerald-700"
                    title="اكتمال المراجعة"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(surah.id)}
                    className="text-red-600 hover:text-red-700"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
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
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
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
              <div className="flex gap-2">
                <button
                  onClick={() => onDelete(surah.id)}
                  className="text-red-600 hover:text-red-700"
                  title="حذف"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
