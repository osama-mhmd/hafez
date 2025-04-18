import { Header } from "./components/Header";
import { AddSurah } from "./components/AddSurah";
import { SurahList } from "./components/SurahList";
import { useSurahs } from "./hooks/useSurahs";

function App() {
  const { surahs, loading, addSurah, completeReview, deleteSurah } =
    useSurahs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container px-4 py-8 mx-auto">
          <div className="text-center">جاري التحميل...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <AddSurah onAdd={addSurah} />
        <SurahList
          surahs={surahs}
          onComplete={completeReview}
          onDelete={deleteSurah}
        />
      </main>
    </div>
  );
}

export default App;
