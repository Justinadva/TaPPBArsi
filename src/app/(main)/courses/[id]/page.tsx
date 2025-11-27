import Image from "next/image";
import Link from "next/link";
import { ArrowLeft,  Share2,  } from "lucide-react";
import { notFound } from "next/navigation";
import { ALL_COURSES } from "@/data/courses"; // Import data sentral
import BookmarkButton from "@/components/BookmarkButton"; // Import komponen baru

// Generate static params
export async function generateStaticParams() {
  return ALL_COURSES.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = ALL_COURSES.find((c) => c.id === resolvedParams.id);

  if (!course) return notFound();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ... (Header Back Link tetap sama) ... */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        <span>Kembali ke Courses</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        {/* BAGIAN KIRI */}
        <div className="lg:col-span-2 space-y-8">
           {/* ... (Image & Deskripsi tetap sama) ... */}
           <div className="relative w-full h-[300px] md:h-[450px] rounded-[40px] overflow-hidden group bg-gray-800">
            <Image src={course.image} alt={course.title} fill priority={true} className="object-cover transition duration-700 group-hover:scale-105" />
            {/* ... Play button overlay ... */}
          </div>
          <div>
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
             {/* ... Deskripsi & Mentor ... */}
             <p className="text-gray-400 leading-relaxed text-lg">{course.description}</p>
          </div>
        </div>

        {/* BAGIAN KANAN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 rounded-[32px] sticky top-24 border border-white/10 bg-[#1a1a1a]/60 backdrop-blur-xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium">Harga Akses</p>
                <p className="text-4xl font-bold text-white">{course.price}</p>
              </div>
              <div className="flex gap-2">
                {/* Tambahkan Bookmark Button Disini */}
                <BookmarkButton courseId={course.id} />
                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <Link href={`/courses/${course.id}/modules/1`}>
              <button className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition mb-4 shadow-lg shadow-white/5 active:scale-95">
                Mulai Belajar
              </button>
            </Link>
            
            {/* ... (List modul tetap sama) ... */}
          </div>
        </div>
      </div>
    </div>
  );
}