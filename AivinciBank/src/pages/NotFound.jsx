"use client";

import React from "react";

import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("3D Scene Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Simple 3D CSS Animation Component with Glitch 404
const CSS3DScene = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* 3D CSS 404 Text with Glitch Effects */}
        <div
          className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none relative"
          style={{
            transform: "perspective(1000px) rotateX(15deg) rotateY(-15deg)",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          {/* Main 404 text */}
          <span
            style={{
              background: "linear-gradient(45deg, #f56500, #20b2aa, #84cc16)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 3s ease infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: isDarkMode
                ? "20px 20px 40px rgba(245, 101, 0, 0.3), -10px -10px 20px rgba(32, 178, 170, 0.2), 0 0 60px rgba(245, 101, 0, 0.4)"
                : "10px 10px 20px rgba(245, 101, 0, 0.2), -5px -5px 10px rgba(32, 178, 170, 0.1), 0 0 30px rgba(245, 101, 0, 0.3)",
            }}
          >
            404
          </span>

          {/* Glitch effect layers */}
          <span
            className="absolute inset-0 opacity-70"
            style={{
              background: "linear-gradient(45deg, #ef4444, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 30%)",
              animation: "glitch1 2s infinite",
              transform: "perspective(1000px) rotateX(15deg) rotateY(-15deg)",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 opacity-70"
            style={{
              background: "linear-gradient(45deg, #84cc16, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              clipPath: "polygon(0 70%, 100% 70%, 100% 100%, 0 100%)",
              animation: "glitch2 2s infinite",
              transform: "perspective(1000px) rotateX(15deg) rotateY(-15deg)",
            }}
          >
            404
          </span>
        </div>
      </div>
    </div>
  );
};

// Simplified WebGL Scene (if WebGL is available)
const SimpleWebGLScene = ({ isDarkMode }) => {
  try {
    const { Canvas } = require("@react-three/fiber");
    const {
      OrbitControls,
      Environment,
      Float,
      Sphere,
    } = require("@react-three/drei");

    const FloatingElements = () => {
      return (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <Float
              key={i}
              speed={1 + Math.random()}
              rotationIntensity={0.5}
              floatIntensity={0.5}
            >
              <Sphere
                args={[0.1]}
                position={[
                  (Math.random() - 0.5) * 6,
                  (Math.random() - 0.5) * 4,
                  (Math.random() - 0.5) * 3,
                ]}
              >
                <meshStandardMaterial
                  color={Math.random() > 0.5 ? "#20b2aa" : "#f56500"}
                  emissive={Math.random() > 0.5 ? "#20b2aa" : "#f56500"}
                  emissiveIntensity={isDarkMode ? 0.2 : 0.1}
                />
              </Sphere>
            </Float>
          ))}
        </>
      );
    };

    return (
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Environment preset={isDarkMode ? "night" : "city"} />
        <ambientLight intensity={isDarkMode ? 0.4 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#f56500" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.6}
          color="#20b2aa"
        />

        <FloatingElements />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    );
  } catch (error) {
    console.log("WebGL not available, using CSS fallback");
    return <CSS3DScene isDarkMode={isDarkMode} />;
  }
};

const NotFound = () => {
  const { darkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebGLSupported(false);
    }

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Bank theme background - changes with theme */}
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

      {/* 3D Scene Container */}
      <div className="absolute inset-0 z-10">
        <ErrorBoundary fallback={<CSS3DScene isDarkMode={darkMode} />}>
          <Suspense fallback={<CSS3DScene isDarkMode={darkMode} />}>
            {webGLSupported ? (
              <SimpleWebGLScene isDarkMode={darkMode} />
            ) : (
              <CSS3DScene isDarkMode={darkMode} />
            )}
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* Subtitle */}
          <div className="mb-8 relative">
            <h2
              className={`text-4xl md:text-6xl font-bold display-font text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-teal-400`}
              style={{
                textShadow: darkMode
                  ? "0 4px 8px rgba(245, 101, 0, 0.3), 0 2px 4px rgba(32, 178, 170, 0.2)"
                  : "0 2px 4px rgba(245, 101, 0, 0.2), 0 1px 2px rgba(32, 178, 170, 0.1)",
              }}
            >
              SƏHIFƏ TAPILMADI
            </h2>
          </div>

          {/* Floating description */}
          <div
            className="mb-12 transform transition-transform duration-300"
            style={{
              transform: `translateX(${mousePosition.x * 10}px) translateY(${
                mousePosition.y * 5
              }px)`,
            }}
          >
            <p
              className={`text-xl md:text-2xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } mb-4 transition-colors duration-300`}
              style={{
                textShadow: darkMode
                  ? "0 2px 4px rgba(0, 0, 0, 0.3)"
                  : "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              Axtardığınız səhifə rəqəmsal fəzada itib...
            </p>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } transition-colors duration-300`}
              style={{
                textShadow: darkMode
                  ? "0 1px 3px rgba(0, 0, 0, 0.3)"
                  : "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              Amma narahat olmayın, biz sizi doğru yola yönəldəcəyik!
            </p>
          </div>

          {/* 3D Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/"
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-teal-500 text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform-gpu"
              style={{
                boxShadow: "0 10px 30px rgba(245, 101, 0, 0.3)",
                transform: "perspective(1000px) rotateX(5deg)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform =
                  "perspective(1000px) rotateX(0deg) translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform =
                  "perspective(1000px) rotateX(5deg) translateY(0px)";
              }}
            >
              <span className="relative z-10 display-font">
                🏠 Ana Səhifəyə Qayıt
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-teal-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className={`group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform-gpu ${
                darkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              style={{
                boxShadow: darkMode
                  ? "0 10px 30px rgba(0, 0, 0, 0.3)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
                transform: "perspective(1000px) rotateX(5deg)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform =
                  "perspective(1000px) rotateX(0deg) translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform =
                  "perspective(1000px) rotateX(5deg) translateY(0px)";
              }}
            >
              <span className="relative z-10 display-font">⬅️ Geri Qayıt</span>
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            </button>
          </div>

          {/* Interactive hint */}
          <div className="mt-12">
            <p
              className={`text-sm ${
                darkMode ? "text-gray-600" : "text-gray-400"
              } animate-pulse transition-colors duration-300`}
            >
              {webGLSupported
                ? "💡 Səhnəni fırlatmaq üçün siçanınızı hərəkət etdirin"
                : "💡 CSS 3D rejimində"}
            </p>
          </div>
        </div>
      </div>

      {/* Floating geometric shapes with bank colors */}
      <div className="absolute inset-0 pointer-events-none z-5">
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

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateY(0px);
          }
          50% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateY(-20px);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glitch1 {
          0%,
          100% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(0);
          }
          20% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(-2px);
          }
          40% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(2px);
          }
          60% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(-1px);
          }
          80% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(1px);
          }
        }

        @keyframes glitch2 {
          0%,
          100% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(0);
          }
          25% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(2px);
          }
          50% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(-2px);
          }
          75% {
            transform: perspective(1000px) rotateX(15deg) rotateY(-15deg)
              translateX(1px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
