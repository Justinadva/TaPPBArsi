import ApiDocsClient from './ApiDocsClient';

export default function ApiDocsPage() {
  // Logika Deteksi URL Server Otomatis
  // 1. Cek environment variable dari Vercel (saat deploy)
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  
  // 2. Tentukan protocol (https di production, http di localhost)
  const protocol = vercelUrl ? 'https' : 'http';
  
  // 3. Tentukan host (vercel url atau localhost)
  const host = vercelUrl || 'localhost:3000';
  
  // 4. Gabungkan
  const baseUrl = `${protocol}://${host}`;

  return (
    <ApiDocsClient baseUrl={baseUrl} />
  );
}