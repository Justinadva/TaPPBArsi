"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import CourseCard from "@/components/CourseCard";

// Dummy Data
const ALL_COURSES = [
  {
    id: "1",
    title: "Modern Apartment Design",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    price: "$24.00",
    duration: "6 Jam",
    modules: 12,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Eco-Friendly Green House",
    category: "Sustainable",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    price: "Free",
    duration: "4 Jam",
    modules: 8,
    rating: 4.5,
  },
  {
    id: "3",
    title: "Urban Sketching Masterclass",
    category: "Skill",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
    price: "$15.00",
    duration: "3 Jam",
    modules: 5,
    rating: 4.9,
  },
  {
    id: "4",
    title: "High-Rise Building Structure",
    category: "Structure",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    price: "$35.00",
    duration: "10 Jam",
    modules: 15,
    rating: 4.7,
  },
  {
    id: "5",
    title: "Minimalist Landscape",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    price: "$18.00",
    duration: "5 Jam",
    modules: 9,
    rating: 4.6,
  },
  {
    id: "6",
    title: "3D Rendering with Blender",
    category: "Software",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    price: "$20.00",
    duration: "8 Jam",
    modules: 14,
    rating: 4.8,
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  // Filter sederhana berdasarkan judul
  const filteredCourses = ALL_COURSES.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 min-h-[80vh] animate-in fade-in duration-700">
      
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Explore <span className="text-[#ff8c42]">Courses</span>
          </h1>
          <p className="text-gray-400 max-w-md text-sm md:text-base">
            Temukan materi terbaik untuk meningkatkan skill arsitekturmu hari ini.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-500 group-focus-within:text-[#ff8c42] transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c42] focus:ring-1 focus:ring-[#ff8c42] transition-all text-sm"
              placeholder="Cari materi..."
            />
          </div>
          
          {/* Tombol Filter (Hiasan) */}
          <button className="p-3.5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/30 transition flex-shrink-0">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Grid Courses */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-white/5">
            <Search size={32} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Tidak ditemukan</h3>
          <p className="text-gray-400 text-sm">Coba kata kunci lain.</p>
        </div>
      )}
    </div>
  );
}