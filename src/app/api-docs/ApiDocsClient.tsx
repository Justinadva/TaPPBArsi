"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import swaggerSpec from "@/config/swagger.json"; 

interface ApiDocsClientProps {
    baseUrl: string;
}

const SwaggerUI = dynamic(() => import('@/components/SwaggerUI'), { 
    ssr: false, 
    loading: () => (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
           <div className="w-8 h-8 border-4 border-[#ff8c42] border-t-transparent rounded-full animate-spin"></div>
           <p className='text-gray-400 text-sm'>Memuat Dokumentasi API...</p>
        </div>
    )
});

export default function ApiDocsClient({ baseUrl }: ApiDocsClientProps) {
  
  const dynamicSpec = {
    ...swaggerSpec,
    servers: [{ url: baseUrl, description: "Server Saat Ini" }]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-6">
      
      <div className="flex items-center justify-between">
        <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="text-sm font-medium">Kembali ke Home</span>
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
            <BookOpen size={32} className='text-[#ff8c42]'/>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
                API Documentation
            </h1>
        </div>
        <p className='text-gray-400 max-w-2xl text-sm leading-relaxed'>
            {/* PERBAIKAN DI SINI: Gunakan &quot; untuk tanda kutip */}
            Dokumentasi lengkap untuk endpoint REST API ArchSmart Lite. 
            Gunakan fitur <b>&quot;Try it out&quot;</b> untuk menguji respons data langsung dari database Supabase Anda.
        </p>
      </div>

      <div className='pt-2'>
        <SwaggerUI spec={dynamicSpec} /> 
      </div>

    </div>
  );
}