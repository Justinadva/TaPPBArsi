import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LessonClient, { CourseContent, Module } from "./LessonClient";

export default async function LessonPageWrapper({ 
  params 
}: { 
  params: Promise<{ id: string; moduleId: string }> 
}) {
  const resolvedParams = await params;
  const { id: courseId, moduleId } = resolvedParams;

  // 1. Ambil Judul Course
  const { data: courseData, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .single();

  if (courseError || !courseData) {
    return notFound();
  }

  // 2. Ambil Semua Modul (untuk Sidebar Navigasi)
  const { data: modulesData, error: modulesError } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", courseId)
    .order("position", { ascending: true }); // Pastikan kolom 'position' ada

  // Jika tidak ada modul di DB, return 404
  if (modulesError || !modulesData || modulesData.length === 0) {
    console.error("Modules Error/Empty:", modulesError);
    return notFound();
  }

  // 3. Mapping Data DB -> Client Component
  // Kita lakukan normalisasi data di sini agar Client Component bersih
  const validModules: Module[] = modulesData.map((m) => ({
    id: m.id,
    title: m.title,
    duration: m.duration || "5 min",
    type: (m.type === "reading") ? "reading" : "video",
    // Pastikan video_url tidak null
    videoUrl: m.video_url || "", 
  }));

  // 4. Validasi Module ID URL
  const currentModuleExists = validModules.some((m) => m.id === moduleId);
  if (!currentModuleExists) {
    return notFound();
  }

  // 5. Format Content
  const formattedContent: CourseContent = {
    id: courseData.id,
    title: courseData.title,
    modules: validModules,
  };

  return (
    <LessonClient 
      courseId={courseId} 
      moduleId={moduleId} 
      courseContent={formattedContent} 
    />
  );
}