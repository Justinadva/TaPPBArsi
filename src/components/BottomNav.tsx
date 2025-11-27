"use client";
import { Home, BookOpen, Bookmark, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Materi", href: "/courses", icon: BookOpen },
    { name: "Favorit", href: "/bookmarks", icon: Bookmark },
    { name: "Profil", href: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 pb-safe pt-2 px-6 z-50 h-20 flex justify-between items-start">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1 w-16">
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? "text-[#ff8c42]" : "text-gray-500"}`}>
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-medium ${isActive ? "text-white" : "text-gray-600"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}