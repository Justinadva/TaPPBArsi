"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen, Star } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  category: string;
  image: string | null; // Kita izinkan null agar fleksibel
  price: string;
  duration: string;
  modules: number;
  rating: number;
}

export default function CourseCard({ id, title, category, image, price, duration, modules, rating }: CourseCardProps) {
  
  // LOGIKA PENGAMAN:
  // Jika 'image' null, undefined, atau string kosong "", gunakan gambar default.
  const fallbackImage = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80";
  
  const validImage = (image && image.trim().length > 0) ? image : fallbackImage;

  return (
    <Link href={`/courses/${id}`} className="block group">
      <div className="glass p-5 rounded-[32px] relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#ff8c42]/50 hover:bg-[#1a1a1a]/80">
        
        {/* Header Kartu */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
              {category}
            </span>
            <h3 className="text-xl font-bold leading-tight text-white group-hover:text-[#ff8c42] transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#ff8c42] flex items-center justify-center shadow-[0_0_15px_rgba(255,140,66,0.3)] group-hover:scale-110 transition-transform">
            <ArrowUpRight className="text-black" size={20} />
          </div>
        </div>

        {/* Gambar Preview */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 bg-gray-800">
          <Image 
            src={validImage} // Gunakan variabel yang sudah diamankan
            alt={title} 
            fill 
            className="object-cover group-hover:scale-105 transition duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badge Harga */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
            <p className="text-white font-bold text-sm">{price}</p>
          </div>

          {/* Badge Rating */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-bold">{rating}</span>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <div className="flex gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#ff8c42]" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#ff8c42]" />
              <span>{modules} Modul</span>
            </div>
          </div>
          
          <span className="text-xs font-bold text-white group-hover:underline decoration-[#ff8c42]">
            Detail
          </span>
        </div>
      </div>
    </Link>
  );
}