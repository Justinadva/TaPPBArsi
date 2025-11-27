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
    // PERBAIKAN: fixed bottom-0 w-full z-[999] agar selalu di atas
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-[#1a1a1a]/95 backdrop-blur-lg border-t border-white/10 pb-safe pt-3 px-6 z-[999] h-20 flex justify-between items-start shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1.5 w-16 group">
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive 
                ? "text-[#ff8c42] -translate-y-1" 
                : "text-gray-500 group-hover:text-gray-300"
            }`}>
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-medium transition-colors duration-300 ${
                isActive ? "text-white" : "text-gray-600"
            }`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}