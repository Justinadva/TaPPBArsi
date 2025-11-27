import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  PlayCircle,
  Star,
  Share2,
  Clock,
  BookOpen,
} from "lucide-react";
import { notFound } from "next/navigation";

// 1. DATA DUMMY (Harus ada di sini agar bisa diakses generateStaticParams)
const ALL_COURSES = [
  {
    id: "1",
    title: "Modern Apartment Design",
    description:
      "Pelajari cara merancang apartemen modern dengan efisiensi ruang yang maksimal dan estetika minimalis. Kursus ini mencakup denah lantai, pemilihan material, hingga pencahayaan.",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    price: "$24.00",
    duration: "6 Jam",
    modules_count: 12,
    rating: 4.8,
    students: 2100,
    mentor: {
      name: "Sarah Jensen",
      role: "Senior Architect",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    modules_list: [
      { title: "Pengenalan Konsep Modern", duration: "15 min" },
      { title: "Denah & Sirkulasi Ruang", duration: "45 min" },
      { title: "Pemilihan Material Sustainable", duration: "30 min" },
      { title: "Teknik Pencahayaan Alami", duration: "60 min" },
      { title: "Final Render & Presentasi", duration: "90 min" },
    ],
  },
  {
    id: "2",
    title: "Eco-Friendly Green House",
    description:
      "Desain rumah ramah lingkungan dengan memanfaatkan energi alam.",
    category: "Sustainable",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    price: "Free",
    duration: "4 Jam",
    modules_count: 8,
    rating: 4.5,
    students: 1200,
    mentor: {
      name: "John Doe",
      role: "Green Architect",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    modules_list: [
      { title: "Konsep Green Living", duration: "20 min" },
      { title: "Panel Surya & Air Hujan", duration: "50 min" },
    ],
  },
  {
    id: "3",
    title: "Urban Sketching Masterclass",
    description: "Teknik sketsa perkotaan cepat dan indah.",
    category: "Skill",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
    price: "$15.00",
    duration: "3 Jam",
    modules_count: 5,
    rating: 4.9,
    students: 3500,
    mentor: {
      name: "Emily White",
      role: "Artist",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    modules_list: [
      { title: "Perspektif 1 Titik", duration: "30 min" },
      { title: "Shading & Texture", duration: "40 min" },
    ],
  },
  // Tambahkan ID lain sesuai data di halaman list courses
  {
    id: "4",
    title: "High-Rise Building Structure",
    category: "Structure",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    price: "$35.00",
    duration: "10 Jam",
    modules_count: 15,
    rating: 4.7,
    students: 0,
    mentor: { name: "-", role: "-", avatar: "" },
    modules_list: [],
    description: "",
  },
  {
    id: "5",
    title: "Minimalist Landscape",
    category: "Landscape",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    price: "$18.00",
    duration: "5 Jam",
    modules_count: 9,
    rating: 4.6,
    students: 0,
    mentor: { name: "-", role: "-", avatar: "" },
    modules_list: [],
    description: "",
  },
  {
    id: "6",
    title: "3D Rendering with Blender",
    category: "Software",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    price: "$20.00",
    duration: "8 Jam",
    modules_count: 14,
    rating: 4.8,
    students: 0,
    mentor: { name: "-", role: "-", avatar: "" },
    modules_list: [],
    description: "",
  },
];

// 2. WAJIB: Generate Static Params (Solusi Error Anda)
export async function generateStaticParams() {
  return ALL_COURSES.map((course) => ({
    id: course.id,
  }));
}

// 3. Komponen Server (Tanpa 'use client')
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const course = ALL_COURSES.find((c) => c.id === resolvedParams.id);

  if (!course) {
    return notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigasi Balik */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Kembali ke Courses</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        {/* BAGIAN KIRI: Preview & Info Utama */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] md:h-[450px] rounded-[40px] overflow-hidden group bg-gray-800">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition">
                <PlayCircle size={40} fill="rgba(255,255,255,0.2)" />
              </button>
            </div>
          </div>

          {/* Judul & Deskripsi */}
          <div>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="px-4 py-1.5 rounded-full bg-[#ff8c42]/20 text-[#ff8c42] text-xs font-bold uppercase tracking-wide border border-[#ff8c42]/20">
                {course.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-white font-bold">{course.rating}</span>
                <span className="text-gray-500 text-sm font-medium ml-1">
                  ({course.students.toLocaleString()} students)
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {course.title}
            </h1>

            {/* Mentor */}
            {course.mentor.name !== "-" && (
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 w-fit">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-600 bg-gray-700">
                  {course.mentor.avatar && (
                    <Image
                      src={course.mentor.avatar}
                      alt="Mentor"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {course.mentor.name}
                  </p>
                  <p className="text-gray-400 text-xs">{course.mentor.role}</p>
                </div>
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-3">
              Tentang Kursus
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              {course.description ||
                "Deskripsi lengkap kursus akan ditampilkan di sini."}
            </p>
          </div>
        </div>

        {/* BAGIAN KANAN: Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Kartu Transaksi */}
          <div className="glass-card p-6 rounded-[32px] sticky top-24 border border-white/10 bg-[#1a1a1a]/60 backdrop-blur-xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium">Harga Akses</p>
                <p className="text-4xl font-bold text-white">{course.price}</p>
              </div>
              <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition">
                <Share2 size={20} />
              </button>
            </div>

            <Link href={`/courses/${course.id}/modules/1`}>
              <button className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition mb-4 shadow-lg shadow-white/5 active:scale-95">
                Mulai Belajar
              </button>
            </Link>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <BookOpen size={16} className="text-[#ff8c42]" />
                {course.modules_count} Modul Pembelajaran:
              </p>

              {course.modules_list.length > 0 ? (
                course.modules_list.map((modul, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ff8c42]/20 text-[#ff8c42] flex items-center justify-center text-xs font-bold group-hover:bg-[#ff8c42] group-hover:text-black transition">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-gray-300 group-hover:text-white transition line-clamp-1 font-medium">
                        {modul.title}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {modul.duration}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Daftar modul belum tersedia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
