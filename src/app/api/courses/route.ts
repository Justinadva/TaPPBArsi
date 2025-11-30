// src/app/api/courses/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Import Supabase Client

// PENTING: Menandai rute sebagai dinamis untuk mengatasi konflik dengan output: "export"
// Ini mencegah build error. Rute ini akan tetap berfungsi di mode pengembangan atau pada hosting yang mendukung serverless functions.
export const dynamic = 'force-dynamic';

/**
 * Route Handler untuk menangani permintaan GET /api/courses
 * Mengambil data kursus langsung dari tabel 'courses' di Supabase.
 */
export async function GET() {
  try {
    // Panggil Supabase
    const { data: courses, error } = await supabase
      .from("courses") // Sesuaikan dengan nama tabel Anda
      .select("*"); 

    // Cek error dari Supabase
    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch courses from database", details: error.message },
        { status: 500 }
      );
    }

    // Kembalikan data
    return NextResponse.json(courses, { status: 200 });

  } catch (error) {
    console.error("Unexpected Error in /api/courses:", error);
    // Tangani error umum lainnya
    return NextResponse.json({ 
        message: "Internal Server Error",
        details: error instanceof Error ? error.message : "An unknown error occurred"
    }, { status: 500 });
  }
}