"use client";

import { useTheme } from "./ThemeContext";
import { useState, useEffect } from "react";

const Loader = () => {
  const { darkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background like NotFound page */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            darkMode ? "opacity-20" : "opacity-15"
          }`}
          style={{
            background: `radial-gradient(circle at ${
              (mousePosition.x + 1) * 50
            }% ${
              (mousePosition.y + 1) * 50
            }%, rgba(245, 101, 0, 0.4) 0%, rgba(32, 178, 170, 0.2) 50%, transparent 70%)`,
          }}
        />
      </div>

      {/* Floating geometric shapes with bank colors */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div
              className="w-3 h-3 bg-gradient-to-r from-orange-400 to-teal-400 opacity-30"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Loader - Banking Theme */}
      <div className="flex flex-col items-center space-y-8 relative z-10">
        {/* Bank Vault Loader */}
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          {/* Vault Circle */}
          <div className="absolute inset-0 border-8 border-gray-300 dark:border-gray-600 rounded-full">
            {/* Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="264"
                strokeDashoffset="66"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59500" />
                  <stop offset="50%" stopColor="#20b2aa" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Vault Handle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Handle Circle */}
              <div
                className="w-16 h-16 border-4 border-gray-400 dark:border-gray-500 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 animate-spin"
                style={{ animationDuration: "4s" }}
              >
                {/* Handle Spokes */}
                <div className="absolute inset-2 flex items-center justify-center">
                  <div className="w-8 h-1 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                  <div className="absolute w-1 h-8 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Banking Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dollar Sign */}
          <div
            className="absolute top-1/4 left-1/4 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg opacity-60">
              $
            </div>
          </div>

          {/* Euro Sign */}
          <div
            className="absolute top-1/3 right-1/4 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-lime-500 rounded-full flex items-center justify-center text-white font-bold text-lg opacity-60">
              €
            </div>
          </div>

          {/* Credit Card */}
          <div
            className="absolute bottom-1/4 left-1/3 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "3s" }}
          >
            <div className="w-12 h-8 bg-gradient-to-r from-orange-500 to-teal-500 rounded opacity-50 flex items-center justify-center">
              <div className="w-8 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Bank Building */}
          <div
            className="absolute bottom-1/3 right-1/3 animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "3s" }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-lime-500 to-orange-500 opacity-50 flex flex-col items-center justify-end">
              <div className="w-6 h-4 bg-current"></div>
              <div className="w-8 h-2 bg-current"></div>
            </div>
          </div>
        </div>

        {/* Bank Name with Typewriter Effect */}
        <div className="text-center space-y-4">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-teal-500 to-lime-500 bg-clip-text text-transparent">
              Aivinci Bank
            </h2>
            {/* Underline Animation */}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-teal-500 rounded-full animate-loading-bar"></div>
            </div>
          </div>

          {/* Loading Text with Banking Terms */}
          <div className="space-y-2">
            {/* Security Indicators */}
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Təhlükəsiz
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Şifrələnmiş
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Qorumalı
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loading-bar {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(0.7);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-spin {
          animation: spin 2s linear infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
