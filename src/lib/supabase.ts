// src/lib/supabase.ts (Contoh, pastikan kode ini sudah benar di project Anda)

import { createClient } from "@supabase/supabase-js";

// Pastikan variabel lingkungan ini tersedia
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);