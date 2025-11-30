import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, PlayCircle, BookOpen, Clock, FileText, Play } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import BookmarkButton from "@/components/BookmarkButton";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  // 1. Ambil detail kursus
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !course) {
    return notFound();
  }

  // 2. Ambil Daftar Modul
  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  const firstModule = modules && modules.length > 0 ? modules[0] : null;
  const startLearningLink = firstModule 
    ? `/courses/${course.id}/modules/${firstModule.id}` 
    : "#";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        <span>Kembali ke Courses</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-10">
            {/* Image Section */}
            <div className="relative w-full h-[300px] md:h-[450px] rounded-[40px] overflow-hidden group bg-gray-800 border border-white/10">
              <Image 
                // UPDATE: Hanya menggunakan image_url dari database
                src={course.image_url} 
                alt={course.title} 
                fill 
                priority={true} 
                className="object-cover transition duration-700 group-hover:scale-105" 
              />
              <Link href={startLearningLink} className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform cursor-pointer">
                    <PlayCircle size={32} className="text-white fill-white/20" />
                </div>
              </Link>
            </div>

            {/* Judul & Deskripsi */}
            <div>
                 <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {course.title}
                 </h1>
                 
                 <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-300">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <Clock size={16} className="text-[#ff8c42]" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <BookOpen size={16} className="text-[#ff8c42]" />
                        <span>{modules?.length || 0} Modul</span>
                    </div>
                 </div>

                 <p className="text-gray-400 leading-relaxed text-lg">
                    {course.description || "Tidak ada deskripsi tersedia."}
                 </p>
            </div>

            {/* DAFTAR MATERI */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Materi Kursus</h3>
                {modules && modules.length > 0 ? (
                    <div className="grid gap-3">
                        {modules.map((module, index) => (
                            <Link 
                                key={module.id} 
                                href={`/courses/${course.id}/modules/${module.id}`}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-[#ff8c42]/50 transition-all"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold group-hover:bg-[#ff8c42] group-hover:text-black transition-colors">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium group-hover:text-[#ff8c42] transition-colors">
                                        {module.title}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            {module.type === 'reading' ? <FileText size={12}/> : <Play size={12}/>}
                                            {module.type === 'reading' ? 'Bacaan' : 'Video'}
                                        </span>
                                        <span>•</span>
                                        <span>{module.duration || '5 min'}</span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-full bg-white/5 text-gray-500 group-hover:text-white transition-colors">
                                    <PlayCircle size={20} />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 text-center text-gray-500">
                        Belum ada materi yang diunggah.
                    </div>
                )}
            </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 rounded-[32px] sticky top-24 border border-white/10 bg-[#1a1a1a]/60 backdrop-blur-xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium">Harga Akses</p>
                <p className="text-4xl font-bold text-white">{course.price}</p>
              </div>
              <div className="flex gap-2">
                <BookmarkButton courseId={course.id} />
                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition border border-white/5">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {firstModule ? (
              <Link href={startLearningLink}>
                <button className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition mb-4 shadow-lg shadow-white/5 active:scale-95">
                  Mulai Belajar
                </button>
              </Link>
            ) : (
              <button disabled className="w-full py-4 rounded-2xl bg-gray-600 text-gray-300 font-bold cursor-not-allowed mb-4 opacity-50">
                Belum Ada Modul
              </button>
            )}
            
            <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                   Akses selamanya • Sertifikat
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}