"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface TestResult {
  id: string;
  created_at: string;
  score: number;
  total_questions: number;
  category: string;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase().auth.getUser();

        if (authError || !authUser) {
          setError("No hay usuario autenticado. Por favor, inicia sesion.");
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase()
          .from("profiles")
          .select("full_name")
          .eq("id", authUser.id)
          .single();

        setUser({
          id: authUser.id,
          email: authUser.email || "",
          full_name: profile?.full_name || authUser.user_metadata?.full_name || "Usuario",
          created_at: authUser.created_at,
        });

        const { data: tests, error: testsError } = await supabase()
          .from("test_results")
          .select("*")
          .eq("user_id", authUser.id)
          .order("created_at", { ascending: false });

        if (testsError) {
          console.error("Error fetching tests:", testsError);
        } else {
          setTestHistory(tests || []);
        }
      } catch (err) {
        setError("Error al cargar los datos del usuario");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return { text: "Excelente", bg: "bg-green-500/15", border: "border-green-500/25" };
    if (percentage >= 60) return { text: "Bueno", bg: "bg-yellow-500/15", border: "border-yellow-500/25" };
    return { text: "Mejorar", bg: "bg-red-500/15", border: "border-red-500/25" };
  };

  const handleLogout = async () => {
    await supabase().auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="page-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-gray-400">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-bg flex items-center justify-center px-4">
        <div className="glass-card p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/15 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6 text-sm">{error}</p>
          <Link href="/" className="btn-primary px-6 py-2.5 text-sm">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg">
      {/* Header */}
      <header className="app-header sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Volver</span>
          </Link>
          <h1 className="text-base font-semibold text-white">Mi Perfil</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors font-medium"
          >
            Cerrar sesion
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* User info card */}
          <div className="glass-card p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {user?.full_name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-bold text-white mb-1">{user?.full_name}</h2>
                <p className="text-gray-400 text-sm mb-1">{user?.email}</p>
                <p className="text-xs text-gray-500">
                  Miembro desde{" "}
                  {new Date(user?.created_at || "").toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{testHistory.length}</p>
                  <p className="text-xs text-gray-400">Tests</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">
                    {testHistory.length > 0
                      ? Math.round(
                          testHistory.reduce(
                            (acc, t) => acc + (t.score / t.total_questions) * 100,
                            0
                          ) / testHistory.length
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-xs text-gray-400">Promedio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Test history */}
          <div className="glass-card p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Historial de Tests
            </h3>

            {testHistory.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-4 text-sm">Aun no has realizado ningun test</p>
                <Link href="/test" className="btn-primary px-6 py-2.5 text-sm">
                  Empezar mi primer test
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {testHistory.map((test) => {
                  const badge = getScoreBadge(test.score, test.total_questions);
                  return (
                    <div
                      key={test.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-medium text-sm">{test.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${badge.bg} ${badge.border} text-white`}>
                            {badge.text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(test.created_at).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className={`text-xl font-bold ${getScoreColor(test.score, test.total_questions)}`}>
                          {test.score}/{test.total_questions}
                        </p>
                        <p className="text-xs text-gray-500">puntos</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
