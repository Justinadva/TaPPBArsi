"use client";

import React, { useEffect, useState } from 'react';
import { default as SwaggerUIComponent } from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface SwaggerUIProps {
  spec: Record<string, unknown>;
}

export default function SwaggerUI({ spec }: SwaggerUIProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // PERBAIKAN: Matikan aturan linter khusus untuk baris ini
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="apidocs-container bg-white p-6 rounded-3xl shadow-xl border border-white/10 overflow-hidden">
      <SwaggerUIComponent 
        spec={spec} 
        docExpansion="none" 
      />
    </div>
  );
}