"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// --- Types ---
export interface Module {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'reading';
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

// --- HELPER: Mengubah Link YouTube Biasa ke Embed ---
// Fungsi ini otomatis menangani berbagai format link YouTube
function getEmbedUrl(url?: string) {
  if (!url) return "";
  
  // Jika sudah format embed, biarkan
  if (url.includes("/embed/")) return url;

  // Regex untuk mengambil Video ID dari berbagai format link YouTube
  const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([^&?]*))/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  // Jika ID ditemukan, kembalikan format embed yang benar
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : url;
}

export default function LessonClient({ courseId, moduleId, courseContent }: LessonClientProps) {
  const { user } = useAuth();
  
  // Cari modul yang aktif, jika tidak ketemu, fallback ke modul pertama
  const currentModule = courseContent.modules.find(m => m.id === moduleId) || courseContent.modules[0];
  
  const [completed, setCompleted] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // 1. Load Progress dari Database
  useEffect(() => {
    async function fetchProgress() {
      if (!user) {
        setLoadingProgress(false);
        return;
      }
      
      const { data } = await supabase
        .from("user_progress")
        .select("module_id")
        .eq("user_id", user.id)
        .eq("course_id", courseId);

      if (data) {
        setCompleted(data.map(item => item.module_id));
      }
      setLoadingProgress(false);
    }

    fetchProgress();
  }, [user, courseId]);

  // 2. Fungsi Toggle Complete
  const toggleComplete = async (modId: string) => {
    if (!user) {
        toast.error("Silakan login untuk menyimpan progress.");
        return;
    }

    // Optimistic Update (Update UI duluan agar terasa cepat)
    const isDone = completed.includes(modId);
    setCompleted(prev => isDone ? prev.filter(id => id !== modId) : [...prev, modId]);

    try {
      if (isDone) {
        // Hapus (Unmark)
        await supabase.from("user_progress").delete().eq("user_id", user.id).eq("module_id", modId);
      } else {
        // Simpan (Mark as Done)
        await supabase.from("user_progress").insert({ user_id: user.id, course_id: courseId, module_id: modId });
        toast.success("Progress disimpan!");
      }
    } catch (err) {
      console.error("Gagal save progress", err);
      toast.error("Gagal menyimpan koneksi.");
      // Rollback jika error
      setCompleted(prev => isDone ? [...prev, modId] : prev.filter(id => id !== modId));
    }
  };

  // Hitung Persentase Progress
  const progressPercent = Math.round((completed.length / courseContent.modules.length) * 100);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[85vh] animate-in fade-in duration-500 pb-20">
      
      {/* === KIRI: PLAYER AREA === */}
      <div className="flex-1 space-y-6">
        
        {/* Breadcrumb */}
        <Link href={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff8c42] transition text-sm font-medium">
          <ArrowLeft size={16} />
          Kembali ke Detail Kursus
        </Link>

        {/* Video Player Container */}
        <div className="w-full aspect-video rounded-[32px] overflow-hidden bg-black border border-white/10 shadow-2xl relative group">
            {currentModule.type === 'video' ? (
                 <iframe 
                 // PENTING: Gunakan fungsi helper di sini
                 src={getEmbedUrl(currentModule.videoUrl)} 
                 title={currentModule.title}
                 className="w-full h-full object-cover"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] p-8 text-center">
                    <FileText size={64} className="text-[#ff8c42] mb-4 opacity-80"/>
                    <h3 className="text-xl font-bold text-white">Modul Bacaan</h3>
                    <p className="text-gray-400 text-sm mt-2 max-w-md">
                      Silakan pelajari materi bacaan yang telah disediakan pada deskripsi di bawah ini.
                    </p>
                </div>
            )}
        </div>

        {/* Header Modul */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentModule.title}</h1>
            <p className="text-gray-400 text-sm flex items-center gap-2">
               {currentModule.type === 'video' ? <Play size={14} className="text-[#ff8c42]"/> : <FileText size={14} className="text-[#ff8c42]"/>}
               {currentModule.type === 'video' ? 'Video Lesson' : 'Reading Material'} • {currentModule.duration}
            </p>
          </div>

          <button 
            onClick={() => toggleComplete(currentModule.id)}
            disabled={loadingProgress}
            className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition ${
                completed.includes(currentModule.id) 
                ? "bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30" 
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {completed.includes(currentModule.id) ? <CheckCircle size={18} /> : null}
            {completed.includes(currentModule.id) ? "Selesai" : "Tandai Selesai"}
          </button>
        </div>

        {/* Deskripsi Area */}
        <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Tentang Modul Ini</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Selamat belajar! Silakan pelajari materi ini dengan seksama. 
                Jika ini adalah video, pastikan menonton sampai habis untuk pemahaman maksimal. 
                Jangan lupa mencatat poin-poin penting.
            </p>
        </div>
      </div>

      {/* === KANAN: SIDEBAR MATERI (Playlist) === */}
      <div className="w-full lg:w-[400px] flex-shrink-0">
        <div className="glass-card p-6 rounded-[32px] sticky top-24 flex flex-col h-[calc(100vh-120px)] bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10">
           
           {/* Progress Header */}
           <div className="mb-6">
             <h3 className="text-lg font-bold text-white">Daftar Materi</h3>
             <div className="flex justify-between items-end mt-2 text-xs">
                <span className="text-gray-400">{completed.length} / {courseContent.modules.length} Selesai</span>
                <span className="text-[#ff8c42] font-bold">{progressPercent}%</span>
             </div>
             <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div 
                    className="h-full bg-[#ff8c42] transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                />
             </div>
           </div>

           {/* List Modules (Scrollable) */}
           <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
             {courseContent.modules.map((item, index) => {
               const isActive = item.id === moduleId;
               const isDone = completed.includes(item.id);

               return (
                 <Link 
                    key={item.id} 
                    href={`/courses/${courseId}/modules/${item.id}`}
                    className={`group flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                        isActive 
                        ? "bg-[#ff8c42]/10 border-[#ff8c42]/50" 
                        : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"
                    }`}
                 >
                    {/* Number / Check Icon */}
                    <div className="relative flex-shrink-0">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                           isActive ? "bg-[#ff8c42] text-black" : 
                           isDone ? "bg-green-500 text-white" : "bg-gray-800 text-gray-500"
                       }`}>
                           {isDone ? <CheckCircle size={14} /> : (index + 1)}
                       </div>
                    </div>
                    
                    {/* Title & Duration */}
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate transition-colors ${
                            isActive ? "text-[#ff8c42]" : "text-gray-300 group-hover:text-white"
                        }`}>
                            {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            {item.type === 'video' ? <Play size={12} className="text-gray-500"/> : <FileText size={12} className="text-gray-500"/>}
                            <span className="text-xs text-gray-500">{item.duration}</span>
                        </div>
                    </div>

                    {/* Play Indicator (Hanya muncul jika aktif) */}
                    {isActive && (
                        <Play size={16} className="text-[#ff8c42] fill-[#ff8c42] animate-pulse" />
                    )}
                 </Link>
               )
             })}
           </div>

        </div>
      </div>

    </div>
  );
}