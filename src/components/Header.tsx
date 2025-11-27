"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { LogOut, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      // PERBAIKAN: Background selalu aktif (Glass effect), shadow muncul saat scroll
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-[#0f0f0f]/90 backdrop-blur-xl border-white/10 shadow-lg" 
          : "bg-[#0f0f0f]/80 backdrop-blur-md border-white/5"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 z-50 group">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-90 duration-500">
          <div className="w-3 h-3 bg-black transform rotate-45"></div>
        </div>
        <span className="text-xl font-bold tracking-wide text-white group-hover:text-[#ff8c42] transition-colors">
          ArchSmart
        </span>
      </Link>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-8">
        {[
          { name: "Home", href: "/" },
          { name: "Courses", href: "/courses" },
          { name: "Saved", href: "/bookmarks" }
        ].map((link) => (
          <Link 
            key={link.name}
            href={link.href} 
            className={`text-sm font-medium transition-colors duration-300 relative group ${
              pathname === link.href ? "text-[#ff8c42]" : "text-gray-300 hover:text-white"
            }`}
          >
            {link.name}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff8c42] transition-all duration-300 ${
              pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
            }`}></span>
          </Link>
        ))}
      </nav>

      {/* User Action */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/profile" className="hidden md:flex items-center gap-3 text-sm font-semibold text-white group bg-white/5 pr-4 pl-1 py-1 rounded-full border border-white/5 hover:border-[#ff8c42]/50 transition-all">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white group-hover:bg-[#ff8c42] group-hover:text-black transition-colors">
                <User size={16} />
              </div>
              <span className="group-hover:text-[#ff8c42] transition-colors">
                {user.user_metadata?.full_name?.split(' ')[0] || "User"}
              </span>
            </Link>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="hidden md:flex p-2.5 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all border border-transparent hover:border-red-500/20"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link 
            href="/login"
            className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-[#ff8c42] hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,140,66,0.4)]"
          >
            Log in
          </Link>
        )}
        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}