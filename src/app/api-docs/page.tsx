// justinadva/tappbarsi/TaPPBArsi-5fe512c881164db80d373ed126fb36130d718e09/src/app/api-docs/page.tsx
import ApiDocsClient from './ApiDocsClient';
// Hapus import { headers } dari 'next/headers'

// Tidak perlu 'async' dan 'await'
export default function ApiDocsPage() {
  
  // Menggunakan NEXT_PUBLIC_VERCEL_URL (diisi Vercel saat build) atau fallback localhost
  const host = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
  
  // Tentukan protokol
  const protocol = host.includes('localhost') ? 'http' : 'https';
  
  // Gabungkan untuk mendapatkan URL dasar lengkap
  const baseUrl = `${protocol}://${host}`;

  return (
    // Teruskan baseUrl ke Client Component
    <ApiDocsClient baseUrl={baseUrl} />
  );
}