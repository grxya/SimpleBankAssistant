"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth, useAuthState } from "../store/hooks/useAuthHook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const { Login } = useAuth();
  const isLoading = useAuthState().isLoading;

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "E-poçt ünvanı tələb olunur";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Düzgün e-poçt ünvanı daxil edin";
    }

    // if (!password) {
    //   newErrors.password = "Şifrə tələb olunur";
    // } else if (password.length < 6) {
    //   newErrors.password = "Şifrə ən azı 6 simvol olmalıdır";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await Login({ email, password });

        if (response.type == "auth/login/rejected") {
          setError(response.payload);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-32 px-4 relative overflow-hidden animated-bg">
      {/* Creative elements */}
      <div className="creative-circle creative-circle-1"></div>
      <div className="creative-circle creative-circle-2"></div>
      <div className="creative-shape creative-shape-1 floating"></div>
      <div className="creative-shape creative-shape-2 floating-delay-1"></div>

      <div className="w-full max-w-md mt-20 relative z-10">
        <div className=" rounded-md p-8 shadow-lg border border-surface-hover">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-6"></div>
            <h1 className="text-2xl font-bold mb-3 display-font ">
              Aivinci Bank-a xoş gəlmisiniz
            </h1>
            <p className="text-muted">Hesabınıza daxil olun</p>
          </div>
          {/* Error message below the form */}
          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-100 text-red-800 border border-red-200 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-poçt ünvanı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted dark:text-black" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 py-3 px-4 rounded-md dark:text-black  bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="sizin@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Şifrə
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted dark:text-black" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 px-4 rounded-md dark:text-black bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted  dark:text-black " />
                  ) : (
                    <Eye className="h-5 w-5 text-muted  dark:text-black " />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-end mb-8">
              <Link
                to="/forgot-password"
                className="text-sm text-lime-500 hover:underline"
              >
                Şifrəni unutmusunuz?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl flex items-center justify-center transition-all bg-lime-500 text-white hover-lift"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-white font-medium">Yüklənir...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-white font-medium">Daxil ol</span>
                  <ArrowRight className="ml-2 h-5 w-5 text-white" />
                </div>
              )}
            </button>

            <div className="mt-8 text-center">
              <p className="text-sm">
                Hesabınız yoxdur?{" "}
                <Link
                  to="/register"
                  className="text-lime-500 hover:underline font-medium"
                >
                  Qeydiyyatdan keçin
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
