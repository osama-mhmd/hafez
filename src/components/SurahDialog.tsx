import { useState } from "react";
import { X, Info, Book, Headphones } from "lucide-react";
import { Surah } from "../types";
import { formatDate } from "../utils/formatDate";
import Quraan from "../utils/quraan";
import { quranSurahs } from "../data/surahs";
import { useQuery } from "@tanstack/react-query";

interface SurahDialogProps {
  surah: Surah;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "info" | "context" | "listen";

export function SurahDialog({ surah, isOpen, onClose }: SurahDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const { isPending, data: surahContent } = useQuery({
    queryKey: ["quran"],
    queryFn: () => {
      const id = quranSurahs.indexOf(surah.name);
      return Quraan.getSurah(id + 1);
    },
    enabled: !!surah,
  });

  if (!isOpen) return null;

  const mockAudio = {
    reciters: [
      { id: 1, name: "عبد الباسط عبد الصمد", duration: "1:23" },
      { id: 2, name: "محمود خليل الحصري", duration: "1:45" },
      { id: 3, name: "مشاري العفاسي", duration: "1:30" },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 font-semibold text-gray-700">تاريخ الحفظ</h3>
              <p className="text-gray-600">{formatDate(surah.memorizedDate)}</p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-gray-700">
                عدد المراجعات
              </h3>
              <p className="text-gray-600">{surah.reviewCount}</p>
            </div>

            {surah.lastReviewed && (
              <div>
                <h3 className="mb-1 font-semibold text-gray-700">آخر مراجعة</h3>
                <p className="text-gray-600">
                  {formatDate(surah.lastReviewed)}
                </p>
              </div>
            )}

            {surah.nextReviewDate && (
              <div>
                <h3 className="mb-1 font-semibold text-gray-700">
                  المراجعة القادمة
                </h3>
                <p className="text-gray-600">
                  {formatDate(surah.nextReviewDate)}
                </p>
              </div>
            )}
          </div>
        );

      case "context":
        return (
          <div className="py-4 space-y-4 overflow-auto text-xl leading-9 pe-2 max-h-96">
            <div className="flex flex-col gap-4">
              {surahContent &&
                surahContent.map((ayah, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <p className="p-4 rounded-md shadow bg-gray-50">{ayah}</p>
                  </div>
                ))}
            </div>
            {isPending && "جاري التحميل"}
          </div>
        );

      case "listen":
        return (
          <div className="space-y-4">
            {mockAudio.reciters.map((reciter) => (
              <div
                key={reciter.id}
                className="flex items-center justify-between p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{reciter.name}</h3>
                  <p className="text-sm text-gray-500">{reciter.duration}</p>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700">
                  <Headphones size={20} />
                </button>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 mx-4 bg-white rounded-lg" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{surah.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === "info"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Info size={18} />
            <span>معلومات</span>
          </button>

          <button
            onClick={() => setActiveTab("context")}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === "context"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Book size={18} />
            <span>السورة</span>
          </button>

          <button
            onClick={() => setActiveTab("listen")}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === "listen"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Headphones size={18} />
            <span>استماع</span>
          </button>
        </div>

        {renderTabContent()}

        <button
          onClick={onClose}
          className="w-full px-4 py-2 mt-6 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
