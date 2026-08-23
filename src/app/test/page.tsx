"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { questions as allQuestions, type Question } from "@/lib/questions";

const TOTAL_QUESTIONS = 50;
const POINTS_PER_QUESTION = 2;
const MAX_SCORE = TOTAL_QUESTIONS * POINTS_PER_QUESTION;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function TestPage() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [saving, setSaving] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unansweredMsg, setUnansweredMsg] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase().auth.getUser();
      setIsAuthenticated(!!user);
      setAuthChecked(true);
      if (user) {
        const shuffled = shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS);
        setSelectedQuestions(shuffled);
      }
    };
    checkAuth();
  }, []);

  if (!authChecked) {
    return (
      <div className="page-bg flex flex-col min-h-screen">
        <header className="app-header shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Salir</span>
            </Link>
            <h1 className="text-base font-semibold text-white">Test de Ingles</h1>
            <div className="w-20" />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="page-bg flex items-center justify-center px-4">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-yellow-500/15 flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Inicia sesion requerido</h2>
          <p className="text-gray-400 text-sm mb-8">
            Debes iniciar sesion para poder realizar el test y guardar tu puntuacion.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/register" className="btn-primary py-3 text-sm">
              Iniciar Sesion
            </Link>
            <Link href="/" className="btn-secondary py-3 text-sm text-center">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className="page-bg flex flex-col min-h-screen">
        <header className="app-header shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Salir</span>
            </Link>
            <h1 className="text-base font-semibold text-white">Test de Ingles</h1>
            <div className="w-20" />
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="spinner" />
          <p className="text-gray-400 text-sm">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  const question = selectedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUnansweredMsg(null);
    } else {
      const unanswered: number[] = [];
      for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        if (selectedAnswers[i] === undefined) {
          unanswered.push(i + 1);
        }
      }
      if (unanswered.length > 0) {
        setUnansweredMsg(`Faltan ${unanswered.length} pregunta(s) por responder: #${unanswered.join(", #")}`);
        return;
      }
      const score = calculateScore();
      saveResult(score);
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct * POINTS_PER_QUESTION;
  };

  const saveResult = async (score: number) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase().auth.getUser();
      if (!user) {
        console.error("No user found for saving result");
        return;
      }

      // Ensure profile exists (foreign key requires it)
      const { data: existingProfile } = await supabase()
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        const { error: profileError } = await supabase().from("profiles").insert({
          id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuario",
        });
        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }

      const { error } = await supabase().from("test_results").insert({
        user_id: user.id,
        score: score,
        total_questions: MAX_SCORE,
        category: "General English",
      });
      if (error) {
        console.error("Error saving result:", error);
      } else {
        console.log("Result saved successfully for user:", user.id, "score:", score);
      }
    } catch (err) {
      console.error("Error saving result:", err);
    } finally {
      setSaving(false);
    }
  };

  if (showResult) {
    const score = calculateScore();
    const correctCount = score / POINTS_PER_QUESTION;

    return (
      <div className="page-bg">
        <header className="app-header">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Salir</span>
            </Link>
            <h1 className="text-base font-semibold text-white">Resultado</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-lg glass-card p-12 text-center">
            <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${
              score >= 80 ? "bg-green-500/15" : score >= 60 ? "bg-yellow-500/15" : "bg-red-500/15"
            }`}>
              {score >= 80 ? (
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : score >= 60 ? (
                <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">Test Completado</h2>
            <p className="text-gray-400 text-base mb-8">Has terminado el test de ingles</p>

            <div className="flex items-center justify-center gap-10 mb-6">
              <div>
                <p className={`text-6xl font-bold ${score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                  {score}
                </p>
                <p className="text-sm text-gray-400 mt-2">de {MAX_SCORE} puntos</p>
              </div>
              <div className="w-px h-16 bg-white/10" />
              <div>
                <p className="text-6xl font-bold text-white">{correctCount}</p>
                <p className="text-sm text-gray-400 mt-2">de {TOTAL_QUESTIONS} correctas</p>
              </div>
            </div>

            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-10 mt-8">
              <div
                className={`h-full rounded-full transition-all ${
                  score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${(score / MAX_SCORE) * 100}%` }}
              />
            </div>

            {!saving && (
              <p className="text-sm text-gray-500 mb-8">
                {score >= 80 ? "Excelente trabajo!" : score >= 60 ? "Buen intento!" : "Sigue practicando!"}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { setShowReview(true); setShowResult(false); }}
                className="btn-primary flex-1 py-4 text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ver Respuestas
              </button>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setShowResult(false);
                  setShowReview(false);
                  setSelectedQuestions(shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS));
                }}
                className="btn-secondary flex-1 py-4 text-base"
              >
                Repetir Test
              </button>
            </div>
            <div className="mt-4">
              <Link href="/" className="btn-secondary w-full py-4 text-base text-center block">
                Volver al Inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showReview) {
    const correctCount = calculateScore() / POINTS_PER_QUESTION;

    return (
      <div className="page-bg">
        <header className="app-header sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => { setShowReview(false); setShowResult(true); }}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Volver al Resultado</span>
            </button>
            <h1 className="text-base font-semibold text-white">Revisar Respuestas</h1>
            <div className="text-sm text-gray-400 font-medium">
              {correctCount}/{TOTAL_QUESTIONS} correctas
            </div>
          </div>
        </header>

        <main className="w-full px-6 py-10">
          <div className="max-w-3xl mx-auto space-y-6">
            {selectedQuestions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={index} className="glass-card p-6">
                  {/* Question header */}
                  <div className="flex items-start gap-4 mb-5">
                    <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                      isCorrect ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                    }`}>
                      {isCorrect ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-2">
                        {q.topic}
                      </span>
                      <p className="text-white font-medium">{q.text}</p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 mb-4">
                    {q.options.map((option, optIndex) => {
                      const isCorrectOption = optIndex === q.correctAnswer;
                      const isUserChoice = optIndex === userAnswer;

                      let styles = "bg-white/[0.03] border-white/[0.08] text-gray-400";
                      if (isCorrectOption) {
                        styles = "bg-green-500/10 border-green-500/30 text-green-400";
                      } else if (isUserChoice && !isCorrect) {
                        styles = "bg-red-500/10 border-red-500/30 text-red-400 line-through";
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 ${styles}`}
                        >
                          <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold border ${
                            isCorrectOption
                              ? "bg-green-500 border-green-500 text-white"
                              : isUserChoice && !isCorrect
                                ? "bg-red-500 border-red-500 text-white"
                                : "border-white/20 text-gray-500"
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="text-sm font-medium">{option}</span>
                          {isCorrectOption && (
                            <svg className="w-4 h-4 text-green-400 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {isUserChoice && !isCorrect && (
                            <svg className="w-4 h-4 text-red-400 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback - only shown when answer is wrong */}
                  {!isCorrect && (
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
                      <div className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-300 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-10">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setShowResult(false);
                  setShowReview(false);
                  setSelectedQuestions(shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS));
                }}
                className="btn-primary flex-1 py-4 text-base"
              >
                Repetir Test
              </button>
              <Link href="/" className="btn-secondary flex-1 py-4 text-base text-center">
                Volver al Inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-bg flex flex-col min-h-screen">
      {/* Header */}
      <header className="app-header shrink-0">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Salir</span>
          </Link>
          <h1 className="text-base font-semibold text-white">Test de Ingles</h1>
          <div className="text-sm text-gray-400 font-medium">
            {currentQuestion + 1}/{TOTAL_QUESTIONS}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="shrink-0 bg-white/[0.03]">
        <div className="px-6 py-1.5">
          <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex flex-col w-full px-6 py-10">
        <div className="max-w-3xl w-full mx-auto">
          {/* Topic badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-medium">
              {question.topic}
            </span>
          </div>

          {/* Question */}
          <div className="glass-card p-8 mb-8">
            <div className="flex items-start gap-5">
              <span className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 text-base font-bold">
                {currentQuestion + 1}
              </span>
              <p className="text-lg text-white leading-relaxed pt-2">{question.text}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-auto">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                  selectedAnswers[currentQuestion] === index
                    ? "bg-blue-500/15 border-blue-500/40 text-white"
                    : "bg-white/[0.03] border-white/[0.08] text-gray-300 hover:bg-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                <span
                  className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold border transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-white/20 text-gray-400"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-base font-medium">{option}</span>
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-6 mt-10 pt-8 border-t border-white/[0.06]">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="btn-secondary px-8 py-3.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <div className="text-sm text-gray-400 font-medium">
              {Object.keys(selectedAnswers).length}/{TOTAL_QUESTIONS} respondidas
            </div>

            <button
              onClick={handleNext}
              className="btn-primary px-8 py-3.5 text-sm"
            >
              {currentQuestion === TOTAL_QUESTIONS - 1 ? "Finalizar" : "Siguiente"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {unansweredMsg && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-medium text-center">
              {unansweredMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
