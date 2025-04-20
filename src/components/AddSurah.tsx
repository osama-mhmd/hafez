import React, { useState, useRef, useEffect } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { quranSurahs } from "../data/surahs";
import { Button } from "./ui/Button";

interface AddSurahProps {
  onAdd: (name: string, date: string) => void;
}

export function AddSurah({ onAdd }: AddSurahProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isStartDropdownOpen, setIsStartDropdownOpen] = useState(false);
  const [isEndDropdownOpen, setIsEndDropdownOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [startSurah, setStartSurah] = useState("");
  const [endSurah, setEndSurah] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredSurahs = quranSurahs.filter((surah) =>
    surah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsStartDropdownOpen(false);
        setIsEndDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isBulkMode && startSurah && endSurah) {
      const startIndex = quranSurahs.indexOf(startSurah);
      const endIndex = quranSurahs.indexOf(endSurah);

      if (startIndex !== -1 && endIndex !== -1) {
        // Determine the correct range regardless of which surah comes first
        const [fromIndex, toIndex] =
          startIndex <= endIndex
            ? [startIndex, endIndex]
            : [endIndex, startIndex];

        // Add all surahs in the range
        const surahsToAdd = quranSurahs.slice(fromIndex, toIndex + 1);
        surahsToAdd.forEach((surah) => {
          console.log(surah);
          onAdd(surah, date);
        });
      }
    } else if (!isBulkMode && startSurah) {
      onAdd(startSurah, date);
    }

    setStartSurah("");
    setEndSurah("");
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8">
      <Button
        className="gap-2"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={20} />
        <span>إضافة سورة</span>
      </Button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 z-50 p-6 mt-2 bg-white rounded-lg shadow-lg top-full w-96"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">إضافة سورة جديدة</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={isBulkMode}
                onChange={(e) => setIsBulkMode(e.target.checked)}
                className="border-gray-300 rounded"
              />
              <span>إضافة مجموعة سور</span>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {isBulkMode ? (
              <>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">من سورة</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsStartDropdownOpen(!isStartDropdownOpen);
                        setIsEndDropdownOpen(false);
                      }}
                      className="flex items-center justify-between w-full p-2 text-right bg-white border rounded-md"
                    >
                      <span>{startSurah || "اختر سورة البداية"}</span>
                      <ChevronDown size={20} />
                    </button>

                    {isStartDropdownOpen && (
                      <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border rounded-md shadow-lg top-full max-h-60">
                        <input
                          type="text"
                          placeholder="ابحث عن سورة..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full p-2 border-b"
                        />
                        {filteredSurahs.map((surah) => (
                          <button
                            key={surah}
                            type="button"
                            onClick={() => {
                              setStartSurah(surah);
                              setIsStartDropdownOpen(false);
                              setSearchTerm("");
                            }}
                            className="w-full px-4 py-2 text-right hover:bg-gray-100"
                          >
                            {surah}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">إلى سورة</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEndDropdownOpen(!isEndDropdownOpen);
                        setIsStartDropdownOpen(false);
                      }}
                      className="flex items-center justify-between w-full p-2 text-right bg-white border rounded-md"
                    >
                      <span>{endSurah || "اختر سورة النهاية"}</span>
                      <ChevronDown size={20} />
                    </button>

                    {isEndDropdownOpen && (
                      <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border rounded-md shadow-lg top-full max-h-60">
                        <input
                          type="text"
                          placeholder="ابحث عن سورة..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full p-2 border-b"
                        />
                        {filteredSurahs.map((surah) => (
                          <button
                            key={surah}
                            type="button"
                            onClick={() => {
                              setEndSurah(surah);
                              setIsEndDropdownOpen(false);
                              setSearchTerm("");
                            }}
                            className="w-full px-4 py-2 text-right hover:bg-gray-100"
                          >
                            {surah}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">اسم السورة</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStartDropdownOpen(!isStartDropdownOpen)}
                    className="flex items-center justify-between w-full p-2 text-right bg-white border rounded-md"
                  >
                    <span>{startSurah || "اختر سورة"}</span>
                    <ChevronDown size={20} />
                  </button>

                  {isStartDropdownOpen && (
                    <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border rounded-md shadow-lg top-full max-h-60">
                      <input
                        type="text"
                        placeholder="ابحث عن سورة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-b"
                      />
                      {filteredSurahs.map((surah) => (
                        <button
                          key={surah}
                          type="button"
                          onClick={() => {
                            setStartSurah(surah);
                            setIsStartDropdownOpen(false);
                            setSearchTerm("");
                          }}
                          className="w-full px-4 py-2 text-right hover:bg-gray-100"
                        >
                          {surah}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="memorizedDate"
                className="block mb-2 text-gray-700"
              >
                تاريخ الحفظ
              </label>
              <input
                type="date"
                id="memorizedDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit">حفظ</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
