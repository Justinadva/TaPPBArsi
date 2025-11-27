"use client";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function BookmarksPage() {
  // Nanti diisi data dari Supabase tabel 'bookmarks'
  const savedCourses: any[] = []; 

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Saved Courses</h1>

      {savedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Bookmark size={32} className="text-gray-400" />
          </div>
          <p className="text-lg text-gray-300">Belum ada materi disimpan.</p>
          <Link href="/courses" className="mt-4 text-[#ff8c42] hover:underline">
            Cari materi sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mapping CourseCard di sini */}
        </div>
      )}
    </div>
  );
}