"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase().auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1920&q=80')",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Top navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">EnglishTest</span>
          </Link>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="spinner !w-5 !h-5 !border-2" />
            ) : user ? (
              <Link
                href="/profile"
                className="btn-secondary px-4 py-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Perfil
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Iniciar Sesion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 tracking-tight leading-tight">
          English Test
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
          Evalua tu nivel de ingles y compite con otros usuarios alrededor del mundo
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/test" className="btn-primary px-10 py-4 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Empezar Test
          </Link>

          <Link href="/stats" className="btn-secondary px-10 py-4 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Estadisticas Globales
          </Link>
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </main>
  );
}
