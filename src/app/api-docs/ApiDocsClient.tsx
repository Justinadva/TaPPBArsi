// justinadva/tappbarsi/TaPPBArsi-5fe512c881164db80d373ed126fb36130d718e09/src/app/api-docs/ApiDocsClient.tsx
"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import swaggerSpec from "@/config/swagger.json"; 

interface ApiDocsClientProps {
    baseUrl: string; // Menerima URL dinamis dari Server Component
}

const SwaggerUI = dynamic(() => import('@/components/SwaggerUI'), { 
    ssr: false, 
    loading: () => (
        <div className="flex justify-center items-center h-64">
           <p className='text-gray-400'>Memuat Dokumentasi API...</p>
        </div>
    )
});

export default function ApiDocsClient({ baseUrl }: ApiDocsClientProps) {
  
  // 1. Kloning spesifikasi dasar (Penting: agar tidak memodifikasi objek impor statis)
  const dynamicSpec = JSON.parse(JSON.stringify(swaggerSpec));
  
  // 2. Ganti placeholder {serverUrl} dengan baseUrl yang dinamis
  dynamicSpec.servers = [{ url: baseUrl, description: "Current Environment URL" }];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        <span>Kembali ke Home</span>
      </Link>

      <div className="flex items-center gap-4">
        <BookOpen size={48} className='text-[#ff8c42]'/>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            API <span className='text-[#ff8c42]'>Docs</span>
        </h1>
      </div>
      <p className='text-gray-400 max-w-2xl'>
        Dokumentasi interaktif untuk REST API ArchSmart. URL server otomatis disesuaikan.
      </p>

      {/* Swagger UI Component */}
      <div className='pt-4'>
        <SwaggerUI spec={dynamicSpec} /> 
      </div>

    </div>
  );
}