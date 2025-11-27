"use client";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // <--- Import Router

export default function BookmarkButton({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const router = useRouter(); // <--- Init Router
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // ... (bagian useEffect tetap sama) ...

  const toggleBookmark = async () => {
    if (!user) {
      toast.error("Silakan login dahulu");
      router.push("/login"); // Redirect ke login jika user null
      return;
    }

    const previousState = isSaved;
    setIsSaved(!isSaved);

    if (!previousState) {
      // LOGIKA SIMPAN
      const { error } = await supabase
        .from("bookmarks")
        .insert({ user_id: user.id, course_id: courseId })
        .select();

      if (error) {
        // Abaikan error duplicate
        if (error.code === '23505') { 
           setIsSaved(true);
           toast.success("Materi berhasil disimpan");
        } 
        // HANDLER KHUSUS JWT EXPIRED
        else if (error.message.includes("JWT expired")) {
           toast.error("Sesi habis, silakan login ulang");
           await supabase.auth.signOut(); // Logout paksa
           router.push("/login"); // Lempar ke halaman login
        }
        else {
           console.error("Error saving:", error);
           setIsSaved(previousState);
           toast.error("Gagal menyimpan: " + error.message);
        }
      } else {
        toast.success("Materi disimpan!");
      }
    } else {
      // ... (Bagian delete tetap sama, boleh tambahkan logika JWT expired juga disini) ...
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", courseId);

      if (error) {
         if (error.message.includes("JWT expired")) {
           toast.error("Sesi habis, silakan login ulang");
           await supabase.auth.signOut();
           router.push("/login");
         } else {
           console.error("Error deleting:", error);
           setIsSaved(previousState);
           toast.error("Gagal menghapus");
         }
      } else {
        toast.info("Dihapus dari koleksi");
      }
    }
  };

  return (
    // ... (Render button tetap sama) ...
    <button 
      onClick={toggleBookmark}
      disabled={loading} // Hapus '&& !!user' agar tombol tetap bisa diklik untuk memicu redirect login
      className={`p-3 rounded-full transition ${
        isSaved 
          ? "bg-[#ff8c42] text-black hover:bg-[#ff8c42]/80" 
          : "bg-white/5 hover:bg-white/10 text-gray-300"
      }`}
    >
      <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
    </button>
  );
}