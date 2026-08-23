"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface RankingEntry {
  user_id: string;
  full_name: string;
  average_score: number;
  total_tests: number;
  best_score: number;
}

interface GlobalStats {
  totalUsers: number;
  totalTests: number;
  averageScore: number;
}

export default function StatsPage() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalUsers: 0,
    totalTests: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overall" | "recent">("overall");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: tests, error: testsError } = await supabase()
          .from("test_results")
          .select("user_id, score, total_questions, created_at");

        if (testsError) {
          console.error("Error fetching tests:", testsError);
        }

        const { data: profiles, error: profilesError } = await supabase()
          .from("profiles")
          .select("id, full_name");

        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
        }

        console.log("Tests fetched:", tests?.length, tests);
        console.log("Profiles fetched:", profiles?.length, profiles);

        const userStats: Record<string, { total_score: number; total_questions: number; test_count: number; best_score: number }> = {};

        tests?.forEach((test) => {
          if (!userStats[test.user_id]) {
            userStats[test.user_id] = { total_score: 0, total_questions: 0, test_count: 0, best_score: 0 };
          }
          userStats[test.user_id].total_score += test.score;
          userStats[test.user_id].total_questions += test.total_questions;
          userStats[test.user_id].test_count += 1;
          const percentage = (test.score / test.total_questions) * 100;
          if (percentage > userStats[test.user_id].best_score) {
            userStats[test.user_id].best_score = percentage;
          }
        });

        const rankingsList: RankingEntry[] = Object.entries(userStats).map(([userId, stats]) => {
          const profile = profiles?.find((p) => p.id === userId);
          return {
            user_id: userId,
            full_name: profile?.full_name || "Usuario Anonimo",
            average_score: Math.round((stats.total_score / stats.total_questions) * 100),
            total_tests: stats.test_count,
            best_score: Math.round(stats.best_score),
          };
        });

        rankingsList.sort((a, b) => b.average_score - a.average_score);
        setRankings(rankingsList);

        const totalUsers = new Set(tests?.map((t) => t.user_id)).size;
        const totalTests = tests?.length || 0;
        const averageScore =
          totalTests > 0
            ? Math.round((tests?.reduce((acc, t) => acc + (t.score / t.total_questions) * 100, 0) || 0) / totalTests)
            : 0;

        setGlobalStats({ totalUsers, totalTests, averageScore });
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0: return "text-yellow-400 bg-yellow-400/10";
      case 1: return "text-gray-300 bg-gray-300/10";
      case 2: return "text-amber-600 bg-amber-600/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

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
          <h1 className="text-base font-semibold text-white">Estadisticas Globales</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Main content */}
      <main className="w-full px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Global stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="glass-card p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{globalStats.totalUsers}</p>
              <p className="text-sm text-gray-400">Usuarios Totales</p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{globalStats.totalTests}</p>
              <p className="text-sm text-gray-400">Tests Realizados</p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-green-500/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{globalStats.averageScore}%</p>
              <p className="text-sm text-gray-400">Promedio Global</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab("overall")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "overall"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Ranking General
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "recent"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Mejores Puntuaciones
            </button>
          </div>

          {/* Rankings table */}
          <div className="glass-card overflow-hidden">
            {loading ? (
              <div className="p-16 text-center">
                <div className="spinner mx-auto mb-5" />
                <p className="text-gray-400 text-sm">Cargando estadisticas...</p>
              </div>
            ) : rankings.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mb-2">No hay datos de rankings disponibles aun</p>
                <p className="text-xs text-gray-500">Los rankings apareceran cuando los usuarios completen tests</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-white/[0.03] text-xs text-gray-400 font-medium uppercase tracking-wider">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Usuario</div>
                  <div className="col-span-2 text-center">Promedio</div>
                  <div className="col-span-2 text-center">Mejor</div>
                  <div className="col-span-2 text-center">Tests</div>
                </div>

                {/* Table rows */}
                {rankings
                  .slice(0, activeTab === "overall" ? 20 : 10)
                  .map((entry, index) => (
                    <div
                      key={entry.user_id}
                      className="grid grid-cols-12 gap-4 px-8 py-5 hover:bg-white/[0.03] transition-colors items-center"
                    >
                      <div className="col-span-1">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${getMedalColor(index)}`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="col-span-5">
                        <p className="text-white font-medium text-sm truncate">{entry.full_name}</p>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`text-base font-bold ${getScoreColor(entry.average_score)}`}>
                          {entry.average_score}%
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`text-sm font-medium ${getScoreColor(entry.best_score)}`}>
                          {entry.best_score}%
                        </span>
                      </div>
                      <div className="col-span-2 text-center text-gray-400 text-sm">
                        {entry.total_tests}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
