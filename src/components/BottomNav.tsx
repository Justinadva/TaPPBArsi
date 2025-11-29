"use client";
import { Home, BookOpen, Bookmark, User, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Materi", href: "/courses", icon: BookOpen },
    { name: "Favorit", href: "/bookmarks", icon: Bookmark },
    user 
      ? { name: "Profil", href: "/profile", icon: User }
      : { name: "Masuk", href: "/login", icon: LogIn },
  ];

  return (
    // CONTAINER UTAMA (Floating Pill)
    // PERBAIKAN: style bottom dengan calc() agar NAIK dan TIDAK NEMPEL bawah
    <div 
      className="md:hidden fixed left-0 right-0 z-[999] flex justify-center px-4 pointer-events-none transition-all duration-500"
      style={{ 
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))" 
      }}
    >
      
      {/* NAVIGASI KAPSUL */}
      {/* max-w-[320px] agar tidak terlalu lebar */}
      <nav className="pointer-events-auto bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] w-full max-w-[320px]">
        
        {navItems.map((item) => {
          // Logika Aktif KONSISTEN untuk semua tombol
          const isActive = item.href === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="relative flex-1 group flex flex-col items-center justify-center"
            >
              {/* ANIMASI IKON */}
              <div className={`
                relative p-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] active:scale-90
                ${isActive 
                  ? "bg-[#ff8c42] text-black -translate-y-8 shadow-[0_8px_20px_rgba(255,140,66,0.4)] scale-110 border-[4px] border-[#0f0f0f]" 
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              {/* LABEL TEKS (Muncul di bawah ikon yang naik) */}
              <span className={`
                absolute bottom-[-18px] text-[10px] font-bold tracking-wide transition-all duration-300
                ${isActive 
                  ? "opacity-100 translate-y-0 text-[#ff8c42]" 
                  : "opacity-0 translate-y-2 text-transparent"
                }
              `}>
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>
    </div>
  );
}