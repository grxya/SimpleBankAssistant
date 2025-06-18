"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  Check,
  Shield,
} from "lucide-react";
import { useAuth, useAuthState } from "../store/hooks/useAuthHook";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { Register, OtpSend, OtpVerify } = useAuth();
  const isLoading = useAuthState().isLoading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullname) {
      newErrors.fullname = "Ad tələb olunur";
    }

    if (!formData.email) {
      newErrors.email = "E-poçt ünvanı tələb olunur";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Düzgün e-poçt ünvanı daxil edin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Şifrə tələb olunur";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifrə ən azı 6 simvol olmalıdır";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifrəni təsdiqləyin";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifrələr uyğun gəlmir";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "İstifadə şərtləri ilə razılaşmalısınız";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (currentStep === 1) {
      nextStep();
      return;
    }

    if (currentStep === 2) {
      if (validateStep2()) {
        try {
          const { fullname, email, password } = formData;
          const response = await Register({ fullname, email, password });

          if (response.type == "auth/register/rejected") {
            setError(response.payload);
          } else {
            startResendTimer();
            setCurrentStep(3);
          }
        } catch (error) {
          console.error("Registration error:", error);
        }
      }
      return;
    }

    if (currentStep === 3) {
      if (!otpCode || otpCode.length !== 6) {
        setOtpError("6 rəqəmli OTP kodu daxil edin");
        return;
      }
      try {
        const response = await OtpVerify({
          email: formData.email,
          code: otpCode,
        });

        if (response.type === "auth/verify-otp/rejected") {
          setOtpError("Yanlış OTP kodu. Yenidən cəhd edin.");
        } else {
          localStorage.setItem("username", formData.fullname);
          navigate("/login");
        }
      } catch (error) {
        console.error("OTP verification error:", error);
      }
    }
  };

  const handleReOtpSend = async () => {
    if (resendTimer > 0) return;
    try {
      const response = await OtpSend({ email: formData.email });

      if (response.type === "auth/send-otp/rejected") {
        setError(response.payload);
        setOtpError("OTP göndərilmədi. Yenidən cəhd edin.");
      } else {
        startResendTimer();
        setOtpError("");
      }
    } catch (error) {
      console.error("OTP send error:", error);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const passwordStrength = getPasswordStrength();

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Çox zəif";
      case 1:
        return "Zəif";
      case 2:
        return "Orta";
      case 3:
        return "Güclü";
      case 4:
        return "Çox güclü";
      default:
        return "";
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-lime-500";
      case 4:
        return "bg-lime-500";
      default:
        return "";
    }
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
              {currentStep === 3
                ? "E-poçt təsdiqləyin"
                : "Aivinci Bank-da hesab yaradın"}
            </h1>
            <p className="text-muted">
              {currentStep === 3
                ? `${formData.email} ünvanına göndərilən kodu daxil edin`
                : "Qeydiyyatdan keçərək xidmətlərimizdən yararlanın"}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-100 text-red-800 border border-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Progress steps */}
          <div className="flex justify-between mb-10 relative">
            <div className="w-full absolute top-1/2 h-1 -translate-y-1/2">
              <div
                className="h-full bg-lime-500 transition-all duration-500"
                style={{
                  width:
                    currentStep === 1
                      ? "33%"
                      : currentStep === 2
                      ? "66%"
                      : "100%",
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
                {currentStep > 1 ? <Check size={18} /> : 1}
              </div>
              <span className="text-sm">Şəxsi məlumatlar</span>
            </div>

            <div className="z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 2
                    ? "bg-lime-500 text-white"
                    : "bg-surface-hover text-muted"
                }`}
              >
                {currentStep > 2 ? <Check size={18} /> : 2}
              </div>
              <span className="text-sm">Təhlükəsizlik</span>
            </div>

            <div className="z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 3
                    ? "bg-lime-500 text-white"
                    : "bg-surface-hover text-muted"
                }`}
              >
                {currentStep > 3 ? <Check size={18} /> : <Shield size={18} />}
              </div>
              <span className="text-sm">Təsdiqləmə</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <>
                <div className=" mb-8">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium mb-2"
                    >
                      Ad
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-muted dark:text-black" />
                      </div>
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={formData.fullname}
                        onChange={handleChange}
                        className={`w-full pl-12 py-3 px-4 rounded-md  dark:text-black bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                          errors.fullname
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        placeholder="Adınız"
                      />
                    </div>
                    {errors.fullname && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.fullname}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    E-poçt ünvanı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted dark:text-black" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 py-3 px-4 rounded-md  dark:text-black bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-3 px-4 rounded-md  dark:text-black bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted dark:text-black" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted dark:text-black" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}

                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">
                          Şifrə gücü: {getStrengthText()}
                        </span>
                        <span className="text-xs">{passwordStrength}/4</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-2"
                  >
                    Şifrəni təsdiqləyin
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted dark:text-black" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-3 px-4 rounded-md  dark:text-black bg-surface-hover border border-surface-hover focus:outline-none focus:border-primary transition-colors ${
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
                        <EyeOff className="h-5 w-5 text-muted dark:text-black" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted dark:text-black" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <div className="flex items-start">
                    <div className="relative">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={() => setAgreeTerms(!agreeTerms)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border ${
                          agreeTerms
                            ? "bg-lime-500 border-primary"
                            : "border-muted bg-surface-hover"
                        } flex items-center justify-center transition-all cursor-pointer`}
                        onClick={() => setAgreeTerms(!agreeTerms)}
                      >
                        {agreeTerms && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className={errors.agreeTerms ? "text-red-500" : ""}
                      >
                        Mən{" "}
                        <Link
                          to="/terms"
                          target="_blank"
                          className="text-lime-500 hover:underline"
                        >
                          İstifadə şərtləri
                        </Link>{" "}
                        və{" "}
                        <Link
                          to="/privacy"
                          target="_blank"
                          className="text-lime-500 hover:underline"
                        >
                          Məxfilik siyasəti
                        </Link>{" "}
                        ilə razıyam
                      </label>
                    </div>
                  </div>
                  {errors.agreeTerms && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-lime-500" />
                  </div>
                  <p className="text-sm text-muted mb-6">
                    E-poçt ünvanınıza 6 rəqəmli təsdiqləmə kodu göndərildi
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Təsdiqləmə kodu
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setOtpCode(value);
                      setOtpError("");
                    }}
                    className={`w-full py-3 px-4 rounded-md bg-surface-hover dark:text-black border border-surface-hover focus:outline-none focus:border-primary transition-colors text-center text-2xl tracking-widest ${
                      otpError ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="000000"
                    maxLength="6"
                  />
                  {otpError && (
                    <p className="mt-2 text-sm text-red-500">{otpError}</p>
                  )}
                </div>

                <div className="text-center mb-8">
                  <p className="text-sm text-muted mb-2">Kod almadınız?</p>
                  <button
                    type="button"
                    onClick={handleReOtpSend}
                    disabled={resendTimer > 0 || isLoading}
                    className={`text-sm font-medium ${
                      resendTimer > 0 || isLoading
                        ? "text-muted cursor-not-allowed"
                        : "text-lime-500 hover:underline"
                    }`}
                  >
                    {resendTimer > 0
                      ? `Yenidən göndər (${resendTimer}s)`
                      : "Yenidən göndər"}
                  </button>
                </div>
              </>
            )}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-3 px-6 rounded-md flex items-center justify-center transition-all border border-surface-hover hover:bg-surface-hover"
                  disabled={isLoading}
                >
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  <span>Geri</span>
                </button>
              )}

              <button
                type="submit"
                className={`py-3 px-6 rounded-xl flex items-center justify-center transition-all bg-lime-500 text-white hover-lift ${
                  currentStep === 1 ? "ml-auto" : "ml-auto"
                }`}
                disabled={
                  isLoading || (currentStep === 3 && otpCode.length !== 6)
                }
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
                    <span className="text-white font-medium">Yüklənir...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-white font-medium">
                      {currentStep === 1
                        ? "Növbəti"
                        : currentStep === 2
                        ? "Qeydiyyatdan keç"
                        : "Təsdiqləyin"}
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 text-white" />
                  </div>
                )}
              </button>
            </div>

            {currentStep === 3 && (
              <div className="mt-8 text-center">
                <p className="text-sm">
                  Artıq hesabınız var?{" "}
                  <Link
                    to="/login"
                    className="text-lime-500 hover:underline font-medium"
                  >
                    Daxil olun
                  </Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
