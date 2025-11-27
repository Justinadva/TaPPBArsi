"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PlayCircle, CheckCircle2, Clock, Star, Share2 } from "lucide-react";

// Dummy Data (Simulasi database)
const COURSE = {
  id: "1",
  title: "Modern Apartment Design",
  description: "Pelajari cara merancang apartemen modern dengan efisiensi ruang yang maksimal dan estetika minimalis. Kursus ini mencakup denah lantai, pemilihan material, hingga pencahayaan.",
  price: "$24.00",
  rating: 4.8,
  students: 2100,
  duration: "6 Jam",
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
  mentor: {
    name: "Sarah Jensen",
    role: "Senior Architect",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  modules: [
    { title: "Pengenalan Konsep Modern", duration: "15 min" },
    { title: "Denah & Sirkulasi Ruang", duration: "45 min" },
    { title: "Pemilihan Material Sustainable", duration: "30 min" },
    { title: "Teknik Pencahayaan Alami", duration: "60 min" },
    { title: "Final Render & Presentasi", duration: "90 min" },
  ]
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  // Di real app, gunakan params.id untuk fetch data dari Supabase
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Navigasi Balik */}
      <Link href="/courses" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
        <ArrowLeft size={20} />
        <span>Kembali ke Courses</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* BAGIAN KIRI: Preview & Info Utama */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] md:h-[450px] rounded-[40px] overflow-hidden group">
            <Image 
              src={COURSE.image} 
              alt={COURSE.title} 
              fill 
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            {/* Overlay Play Button */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition">
               <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition">
                 <PlayCircle size={40} fill="rgba(255,255,255,0.2)" />
               </button>
            </div>
          </div>

          {/* Judul & Deskripsi */}
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="px-4 py-1.5 rounded-full bg-[#ff8c42]/20 text-[#ff8c42] text-xs font-bold uppercase tracking-wide border border-[#ff8c42]/20">
                 Premium Course
               </span>
               <div className="flex items-center gap-1 text-yellow-400">
                 <Star size={16} fill="currentColor" />
                 <span className="text-white font-bold">{COURSE.rating}</span>
                 <span className="text-gray-500 text-sm">({COURSE.students} reviews)</span>
               </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {COURSE.title}
            </h1>
            
            {/* Mentor */}
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 w-fit">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-600">
                 <Image src={COURSE.mentor.avatar} alt="Mentor" fill className="object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{COURSE.mentor.name}</p>
                <p className="text-gray-400 text-xs">{COURSE.mentor.role}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">Tentang Kursus</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              {COURSE.description}
            </p>
          </div>
        </div>

        {/* BAGIAN KANAN: Sidebar Materi & Harga */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Kartu Transaksi (Sticky) */}
          <div className="glass-card p-6 rounded-[32px] sticky top-24">
             <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Total Harga</p>
                  <p className="text-4xl font-bold text-white">{COURSE.price}</p>
                </div>
                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition">
                  <Share2 size={20} />
                </button>
             </div>

             <button className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition mb-4 shadow-lg shadow-white/5">
               Beli Sekarang
             </button>

             <div className="space-y-3 pt-4 border-t border-white/10">
               <p className="text-sm font-medium text-white mb-2">Materi yang dipelajari:</p>
               {COURSE.modules.map((modul, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 group-hover:text-white transition">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-gray-300 group-hover:text-white transition line-clamp-1">{modul.title}</p>
                    </div>
                    <span className="text-xs text-gray-500">{modul.duration}</span>
                 </div>
               ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}