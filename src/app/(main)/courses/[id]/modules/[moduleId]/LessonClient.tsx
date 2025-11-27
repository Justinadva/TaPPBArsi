"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle, FileText } from "lucide-react";

// DEFINE TYPES (Pastikan ini sesuai dengan data)
export interface Module {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'reading'; // <-- Union Type yang ketat
    videoUrl?: string;
}

export interface CourseContent {
    id: string;
    title: string;
    modules: Module[];
}

interface LessonClientProps {
    courseId: string;
    moduleId: string;
    courseContent: CourseContent;
}

export default function LessonClient({ courseId, moduleId, courseContent }: LessonClientProps) {
  // Find the current module based on props
  const currentModule = courseContent.modules.find(m => m.id === moduleId) || courseContent.modules[0];
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleComplete = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(c => c !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[85vh] animate-in fade-in duration-500">
      
      {/* === KIRI: VIDEO PLAYER & CONTENT === */}
      <div className="flex-1 space-y-6">
        
        {/* Breadcrumb */}
        <Link href={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff8c42] transition text-sm font-medium">
          <ArrowLeft size={16} />
          Kembali ke Detail
        </Link>

        {/* Video Player Container (Glass) */}
        <div className="w-full aspect-video rounded-[32px] overflow-hidden bg-black border border-white/10 shadow-2xl relative group">
            {currentModule.type === 'video' ? (
                 <iframe 
                 src={currentModule.videoUrl} 
                 title="Video Player"
                 className="w-full h-full object-cover"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a]">
                    <FileText size={64} className="text-gray-600 mb-4"/>
                    <p className="text-gray-400 font-medium">Modul Bacaan</p>
                </div>
            )}
        </div>

        {/* Judul & Navigasi Bawah Video */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{currentModule.title}</h1>
            <p className="text-gray-400 text-sm">Modul {currentModule.id} • {currentModule.duration}</p>
          </div>

          <button 
            onClick={() => toggleComplete(currentModule.id)}
            className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition ${
                completed.includes(currentModule.id) 
                ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {completed.includes(currentModule.id) ? <CheckCircle size={18} /> : null}
            {completed.includes(currentModule.id) ? "Selesai" : "Tandai Selesai"}
          </button>
        </div>

        {/* Tabs (Deskripsi / Diskusi) */}
        <div className="bg-[#1a1a1a]/50 rounded-3xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Deskripsi Materi</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Pada modul ini, kita akan mempelajari dasar-dasar {currentModule.title}. 
                Penting untuk memahami konteks ruang dan bagaimana cahaya mempengaruhi mood sebuah ruangan. 
                Silakan tonton video sampai habis dan kerjakan kuis di akhir sesi.
            </p>
        </div>

      </div>

      {/* === KANAN: PLAYLIST (Sidebar) === */}
      <div className="w-full lg:w-[380px] flex-shrink-0">
        <div className="glass-card p-5 rounded-[32px] sticky top-24 flex flex-col h-[calc(100vh-120px)] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10">
           
           <div className="mb-6 px-2">
             <h3 className="text-lg font-bold text-white">Daftar Materi</h3>
             <p className="text-xs text-gray-400 mt-1">{completed.length} / {courseContent.modules.length} Selesai</p>
             {/* Progress Bar */}
             <div className="w-full h-1.5 bg-gray-700 rounded-full mt-3 overflow-hidden">
                <div 
                    className="h-full bg-[#ff8c42] transition-all duration-500" 
                    style={{ width: `${(completed.length / courseContent.modules.length) * 100}%` }}
                />
             </div>
           </div>

           {/* List Item (Scrollable) */}
           <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
             {courseContent.modules.map((item) => {
               const isActive = item.id === moduleId;

               return (
                 <Link 
                    key={item.id} 
                    href={`/courses/${courseId}/modules/${item.id}`}
                    className={`group flex items-center gap-4 p-3 rounded-2xl transition-all border ${
                        isActive 
                        ? "bg-[#ff8c42]/10 border-[#ff8c42]/50" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    }`}
                 >
                    <div className="relative">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition ${
                           isActive ? "bg-[#ff8c42] text-black" : 
                           completed.includes(item.id) ? "bg-green-500 text-white" : "bg-gray-800 text-gray-400 group-hover:bg-white/10"
                       }`}>
                           {completed.includes(item.id) ? <CheckCircle size={16} /> : item.id}
                       </div>
                       {isActive && (
                           <div className="absolute -inset-1 bg-[#ff8c42] rounded-full blur-md opacity-20 animate-pulse"></div>
                       )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate transition ${isActive ? "text-[#ff8c42]" : "text-gray-300 group-hover:text-white"}`}>
                            {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                            {item.type === 'video' ? <Play size={10} className="text-gray-500"/> : <FileText size={10} className="text-gray-500"/>}
                            <span className="text-[10px] text-gray-500">{item.duration}</span>
                        </div>
                    </div>
                 </Link>
               )
             })}
           </div>
        </div>
      </div>

    </div>
  );
}