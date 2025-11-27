import LessonClient, { CourseContent } from "./LessonClient";
import { notFound } from "next/navigation";
import { ALL_COURSES } from "@/data/courses";

export async function generateStaticParams() {
  return ALL_COURSES.flatMap((course) => 
    course.modules_list.map((moduleItem) => ({
      id: course.id,
      moduleId: moduleItem.id,
    }))
  );
}

export default async function LessonPageWrapper({ 
  params 
}: { 
  params: Promise<{ id: string; moduleId: string }> 
}) {
    const resolvedParams = await params;
    const courseData = ALL_COURSES.find((c) => c.id === resolvedParams.id);

    if (!courseData) return notFound();

    const moduleExists = courseData.modules_list.some((m) => m.id === resolvedParams.moduleId);
    if (!moduleExists) return notFound();

    // PERBAIKAN: Mapping data dengan tipe yang benar (menghilangkan 'as any')
    const formattedContent: CourseContent = {
        id: courseData.id,
        title: courseData.title,
        modules: courseData.modules_list.map(m => ({
            ...m,
            // Paksa tipe string menjadi tipe literal union yang diharapkan
            type: m.type as 'video' | 'reading' 
        })),
    };

    return (
        <LessonClient 
            courseId={resolvedParams.id} 
            moduleId={resolvedParams.moduleId} 
            courseContent={formattedContent} 
        />
    );
}