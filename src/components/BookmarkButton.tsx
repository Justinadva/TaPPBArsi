"use client";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookmarkButton({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pindahkan logika pengecekan user ke dalam fungsi async
    const checkBookmark = async () => {
      // Jika user belum login, matikan loading dan berhenti
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();
      
      if (data) setIsSaved(true);
      setLoading(false);
    };

    checkBookmark();
  }, [user, courseId]);

  const toggleBookmark = async () => {
    if (!user) {
      toast.error("Silakan login dahulu");
      router.push("/login");
      return;
    }

    const previousState = isSaved;
    setIsSaved(!isSaved);

    if (!previousState) {
      const { error } = await supabase
        .from("bookmarks")
        .insert({ user_id: user.id, course_id: courseId })
        .select();

      if (error) {
        if (error.code === '23505') { 
           setIsSaved(true);
           toast.success("Materi berhasil disimpan");
        } 
        else if (error.message.includes("JWT expired")) {
           toast.error("Sesi habis, silakan login ulang");
           await supabase.auth.signOut();
           router.push("/login");
        }
        else {
           console.error("Error saving:", error);
           setIsSaved(previousState);
           toast.error("Gagal menyimpan");
        }
      } else {
        toast.success("Materi disimpan!");
      }
    } else {
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
    <button 
      onClick={toggleBookmark}
      disabled={loading}
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