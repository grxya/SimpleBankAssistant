"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Check,
} from "lucide-react";
import { useAuth, useAuthState } from "../store/hooks/useAuthHook";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const isLoading = useAuthState().isLoading;
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { OtpSend, ResetPassword } = useAuth();

  const validateEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "E-poçt ünvanı tələb olunur";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Düzgün e-poçt ünvanı daxil edin";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!otp) {
      newErrors.otp = "OTP kodu tələb olunur";
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP kodu 6 rəqəm olmalıdır";
    }
    if (!newPassword) {
      newErrors.newPassword = "Yeni şifrə tələb olunur";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Şifrə ən azı 8 simvol olmalıdır";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Şifrə təkrarı tələb olunur";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Şifrələr uyğun gəlmir";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (validateEmail()) {
      try {
        const response = await OtpSend({ email });

        if (response.type === "auth/send-otp/rejected") {
          setError(response.payload);
        } else {
          setSuccessMessage("OTP kodu e-poçt ünvanınıza göndərildi");
          setCurrentStep(2);
          setErrors({});
        }
      } catch (error) {
        console.error("Send OTP error:", error);
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (validateStep2()) {
      try {
        const response = await ResetPassword({ email, code: otp, newPassword });

        if (response.type === "auth/reset-password/rejected") {
          setSuccessMessage("");
          setError(response.payload);
        } else {
          setSuccessMessage("Şifrəniz uğurla dəyişdirildi!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.error("Reset password error:", error);
      }
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setSuccessMessage("");
    setError("");
  };

  return (
    <div className="flex-grow flex items-center justify-center py-32 px-4 relative overflow-hidden animated-bg">
      {/* Creative elements */}
      <div className="creative-circle creative-circle-1"></div>
      <div className="creative-circle creative-circle-2"></div>
      <div className="creative-shape creative-shape-1 floating"></div>
      <div className="creative-shape creative-shape-2 floating-delay-1"></div>

      <div className="w-full max-w-2xl mt-16 relative z-10">
        <div className="rounded-md p-8 shadow-lg border border-surface-hover">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6"></div>
            <h1 className="text-2xl font-bold mb-3 display-font">
              Şifrəni Bərpa Et
            </h1>
            <p className="text-muted">
              {currentStep === 1
                ? "E-poçt ünvanınızı daxil edərək şifrəni bərpa edin"
                : "OTP kodu və yeni şifrəni daxil edin"}
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex justify-between mb-10 relative">
            <div className="w-full absolute top-1/2 h-1 -translate-y-1/2">
              <div
                className="h-full bg-lime-500 transition-all duration-500"
                style={{
                  width: currentStep === 1 ? "50%" : "100%",
                }}
              ></div>
            </div>

            <div className="z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 1
                    ? "bg-lime-500 text-white"
                    : "bg-surface-hover text-muted"
                }`}
              >
                {currentStep > 1 ? <Check size={18} /> : <Mail size={18} />}
              </div>
              <span className="text-sm">E-poçt təsdiqi</span>
            </div>

            <div className="z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 2
                    ? "bg-lime-500 text-white"
                    : "bg-surface-hover text-muted"
                }`}
              >
                <Shield size={18} />
              </div>
              <span className="text-sm">Şifrə dəyişikliyi</span>
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-100 text-red-800 border border-red-200">
              {error}
            </div>
          )}

          <form
            onSubmit={currentStep === 1 ? handleSendOtp : handleResetPassword}
          >
            {currentStep === 1 && (
              <>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    E-poçt ünvanı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-12 py-3 px-4 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="sizin@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-lime-500" />
                  </div>
                  <p className="text-sm text-muted mb-6">
                    {email} ünvanına 6 rəqəmli təsdiqləmə kodu göndərildi
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Təsdiqləmə kodu
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setOtp(value);
                      setErrors({});
                    }}
                    className={`w-full py-3 px-4 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors text-center text-2xl tracking-widest ${
                      errors.otp ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="000000"
                    maxLength="6"
                  />
                  {errors.otp && (
                    <p className="mt-2 text-sm text-red-500">{errors.otp}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium mb-2"
                  >
                    Yeni Şifrə
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted" />
                    </div>
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full pl-12 pr-12 py-3 px-4 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                        errors.newPassword
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-muted" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-2"
                  >
                    Şifrəni Təkrarla
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-12 pr-12 py-3 px-4 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-muted" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBackToStep1}
                  className="py-3 px-6 rounded-md flex items-center justify-center transition-all border border-surface-hover hover:bg-surface-hover"
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  <span>Geri</span>
                </button>
              )}

              <button
                type="submit"
                className={`py-3 px-6 rounded-xl flex items-center justify-center transition-all bg-lime-500 text-white hover-lift ${
                  currentStep === 1 ? "ml-auto" : "ml-auto"
                }`}
                disabled={isLoading || (currentStep === 2 && otp.length !== 6)}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    <span className="text-white font-medium">
                      {currentStep === 1 ? "Göndərilir..." : "Dəyişdirilir..."}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-white font-medium">
                      {currentStep === 1 ? "OTP Göndər" : "Şifrəni Dəyişdir"}
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 text-white" />
                  </div>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm">
                Hesabınızı xatırlayırsınız?{" "}
                <Link
                  to="/login"
                  className="text-lime-500 hover:underline font-medium"
                >
                  Daxil olun
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
