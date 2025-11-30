// justinadva/tappbarsi/TaPPBArsi-5fe512c881164db80d373ed126fb36130d718e09/src/components/SwaggerUI.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { default as SwaggerUIComponent } from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface SwaggerUIProps {
  spec: Record<string, any>;
}

export default function SwaggerUI({ spec }: SwaggerUIProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Memastikan Swagger UI hanya dimuat di sisi klien
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <div className="flex justify-center items-center h-64">
           <p className='text-gray-400'>Memuat Dokumentasi API...</p>
        </div>
    );
  }

  return (
    // Tambahkan kelas 'apidocs-container' untuk styling di globals.css
    <div className="apidocs-container bg-white p-6 rounded-3xl shadow-xl border border-white/10 overflow-hidden">
      <SwaggerUIComponent 
        spec={spec} 
        docExpansion="none" 
      />
    </div>
  );
}