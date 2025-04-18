import { BookOpenCheck } from "lucide-react";

export function Header() {
  return (
    <header className="p-4 text-white shadow-lg bg-emerald-700">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <BookOpenCheck size={32} />
          <h1 className="text-2xl font-bold">حافظ</h1>
        </div>
        <p className="text-sm opacity-90">
          تطبيق لمساعدتك في حفظ القرآن الكريم
        </p>
      </div>
    </header>
  );
}
