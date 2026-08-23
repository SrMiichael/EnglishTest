"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [success, setSuccess] = useState<string | null>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error: authError } = await supabase().auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Error al iniciar sesion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (regPassword !== confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }

    if (regPassword.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase().auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Create profile immediately after signup
      if (data?.user) {
        await supabase().from("profiles").insert({
          id: data.user.id,
          full_name: fullName,
        });
      }

      // Show success and switch to login
      setSuccess("Cuenta creada exitosamente. Ahora puedes iniciar sesion.");
      setMode("login");
      setLoginEmail(regEmail);
      setLoginPassword("");
      setFullName("");
      setRegEmail("");
      setRegPassword("");
      setConfirmPassword("");
    } catch {
      setError("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="page-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>

        {/* Card */}
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/15 flex items-center justify-center">
              {mode === "login" ? (
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
            </h1>
            <p className="text-gray-400 text-sm">
              {mode === "login"
                ? "Bienvenido de vuelta"
                : "Registrate para empezar a practicar"}
            </p>
          </div>

          {/* Success message */}
          {success && (
            <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Correo electronico
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="input-field"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Contrasena
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="input-field"
                  placeholder="Tu contrasena"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner !w-5 !h-5 !border-2" />
                    Iniciando sesion...
                  </div>
                ) : (
                  "Iniciar Sesion"
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Nombre completo
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Correo electronico
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="input-field"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Contrasena
                </label>
                <input
                  id="reg-password"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="input-field"
                  placeholder="Minimo 6 caracteres"
                  required
                />
              </div>

              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Confirmar contrasena
                </label>
                <input
                  id="reg-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  placeholder="Repite tu contrasena"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner !w-5 !h-5 !border-2" />
                    Creando cuenta...
                  </div>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            </form>
          )}

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {mode === "login" ? (
                <>
                  No tienes cuenta?{" "}
                  <span className="text-blue-400 hover:text-blue-300 font-medium">
                    Registrate
                  </span>
                </>
              ) : (
                <>
                  Ya tienes cuenta?{" "}
                  <span className="text-blue-400 hover:text-blue-300 font-medium">
                    Inicia sesion
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
