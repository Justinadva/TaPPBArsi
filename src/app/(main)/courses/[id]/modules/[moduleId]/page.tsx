import LessonClient, { CourseContent } from "./LessonClient";
import { notFound } from "next/navigation";
import { ALL_COURSES } from "@/data/courses"; // <--- Import Data Pusat

/**
 * generateStaticParams: Menghasilkan semua kombinasi URL yang mungkin
 * untuk (id course) dan (id modul).
 */
export async function generateStaticParams() {
  // Kita gunakan flatMap untuk menggabungkan array dari semua kursus
  return ALL_COURSES.flatMap((course) => 
    course.modules_list.map((moduleItem) => ({
      id: course.id,
      moduleId: moduleItem.id,
    }))
  );
}

// Komponen Server
export default async function LessonPageWrapper({ 
  params 
}: { 
  params: Promise<{ id: string; moduleId: string }> 
}) {
    const resolvedParams = await params;

    // 1. Cari Course yang sesuai ID
    const courseData = ALL_COURSES.find((c) => c.id === resolvedParams.id);

    if (!courseData) {
        return notFound();
    }

    // 2. Cek apakah Modul ID ada di dalam course tersebut
    const moduleExists = courseData.modules_list.some((m) => m.id === resolvedParams.moduleId);

    if (!moduleExists) {
        return notFound();
    }

    // 3. Format data agar sesuai dengan props yang diminta LessonClient
    // (Mapping: 'modules_list' di data pusat -> 'modules' di komponen client)
    const formattedContent: CourseContent = {
        id: courseData.id,
        title: courseData.title,
        modules: courseData.modules_list as any, // Cast any karena struktur data mungkin sedikit beda tapi kompatibel
    };

    // 4. Render Client Component
    return (
        <LessonClient 
            courseId={resolvedParams.id} 
            moduleId={resolvedParams.moduleId} 
            courseContent={formattedContent} 
        />
    );
}