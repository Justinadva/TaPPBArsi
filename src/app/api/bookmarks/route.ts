import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

// GET: Ambil daftar bookmark user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ message: "Missing user_id parameter" }, { status: 400 });
  }

  try {
    const { data: bookmarks, error } = await supabase
      .from("bookmarks")
      .select("course_id")
      .eq("user_id", userId);

    if (error) throw error;

    if (!bookmarks || bookmarks.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const courseIds = bookmarks.map((b) => b.course_id);
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .in("id", courseIds);

    if (coursesError) throw coursesError;

    return NextResponse.json(courses, { status: 200 });

  } catch (error: unknown) { 
    // PERBAIKAN: Gunakan 'unknown' alih-alih 'any'
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// POST: Tambah bookmark baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, course_id } = body;

    if (!user_id || !course_id) {
      return NextResponse.json({ message: "Missing user_id or course_id" }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user_id)
      .eq("course_id", course_id)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Bookmark already exists" }, { status: 200 });
    }

    const { error } = await supabase
      .from("bookmarks")
      .insert({ user_id, course_id });

    if (error) throw error;

    return NextResponse.json({ message: "Bookmark added successfully" }, { status: 201 });

  } catch (error: unknown) { 
    // PERBAIKAN: Gunakan 'unknown' alih-alih 'any'
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}