import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LessonClient, { CourseContent, Module } from "./LessonClient";

// Hapus generateStaticParams karena kita menggunakan Dynamic Rendering (Data Real-time)

export default async function LessonPageWrapper({ 
  params 
}: { 
  params: Promise<{ id: string; moduleId: string }> 
}) {
  const resolvedParams = await params;
  const { id: courseId, moduleId } = resolvedParams;

  console.log("--> Memuat Modul...");
  console.log("    Course ID:", courseId);
  console.log("    Module ID:", moduleId);

  // 1. Ambil Judul Course (untuk header/konteks)
  const { data: courseData, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .single();

  if (courseError || !courseData) {
    console.error("❌ Course tidak ditemukan atau Error:", courseError?.message);
    return notFound();
  }

  // 2. Ambil Daftar Modul dari Database
  // Kita ambil SEMUA modul di course ini untuk membuat sidebar navigasi
  const { data: modulesData, error: modulesError } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", courseId)
    .order("position", { ascending: true }); // Pastikan kolom 'position' ada di DB

  // Cek Error Database
  if (modulesError) {
    console.error("❌ Gagal mengambil modules:", modulesError.message);
    return notFound(); // Atau bisa return Error UI
  }

  // Cek Apakah Modul Kosong
  if (!modulesData || modulesData.length === 0) {
    console.warn("⚠️ Tidak ada modul ditemukan di database untuk Course ID ini.");
    // Jika tidak ada modul sama sekali di DB, kita return 404
    return notFound();
  }

  // 3. Mapping data dari DB ke tipe Module untuk Client Component
  // Pastikan properti video_url dan type ditangani dengan aman
  const validModules: Module[] = modulesData.map((m) => ({
    id: m.id,
    title: m.title,
    duration: m.duration || "5 min",
    // Pastikan type hanya 'video' atau 'reading'. Default ke 'video' jika null.
    type: (m.type === "reading") ? "reading" : "video",
    videoUrl: m.video_url || "",
  }));

  // 4. Validasi: Apakah moduleId yang ada di URL benar-benar ada di database?
  const currentModuleExists = validModules.some((m) => m.id === moduleId);
  
  if (!currentModuleExists) {
    console.warn(`⚠️ Module ID '${moduleId}' tidak ditemukan dalam daftar modul kursus ini.`);
    console.log("    ID Modul yang tersedia:", validModules.map(m => m.id));
    return notFound();
  }

  // 5. Format Data Akhir untuk dikirim ke Client Component
  const formattedContent: CourseContent = {
    id: courseData.id,
    title: courseData.title,
    modules: validModules,
  };

  console.log("✅ Berhasil memuat modul:", moduleId);

  return (
    <LessonClient 
      courseId={courseId} 
      moduleId={moduleId} 
      courseContent={formattedContent} 
    />
  );
}