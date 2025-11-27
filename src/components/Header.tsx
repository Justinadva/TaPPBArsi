"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { LogOut, User, Menu } from "lucide-react";

export default function Header() {
  const { user } = useAuth();

  return (
    // Hapus 'hidden', ganti jadi 'flex'. Tambahkan background solid hitam agar tidak transparan aneh.
    <header className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 bg-background border-b border-white/10 shadow-md">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 z-50">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-black transform rotate-45"></div>
        </div>
        <span className="text-xl font-bold tracking-wide text-white">ArchSmart</span>
      </Link>

      {/* Menu Desktop (Hidden di Mobile) */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-sm font-medium text-white hover:text-primary transition">Home</Link>
        <Link href="/courses" className="text-sm font-medium text-gray-400 hover:text-white transition">Courses</Link>
        <Link href="/bookmarks" className="text-sm font-medium text-gray-400 hover:text-white transition">Saved</Link>
      </nav>

      {/* User Action */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/profile" className="hidden md:flex items-center gap-2 text-sm font-semibold text-white">
              <span className="text-right">
                <p className="leading-none">{user.user_metadata?.full_name?.split(' ')[0]}</p>
              </span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
            </Link>
            {/* Tombol Logout Desktop */}
            <button 
              onClick={() => supabase.auth.signOut()}
              className="hidden md:flex p-2 bg-white/5 rounded-full hover:bg-white/10 text-red-400"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link 
            href="/login"
            className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition"
          >
            Log in
          </Link>
        )}

        {/* Menu Icon Mobile (Hanya muncul di HP) */}
        <button className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}