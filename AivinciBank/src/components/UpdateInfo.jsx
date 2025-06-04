"use client";

import { useState } from "react";
import { UserCog } from "lucide-react";
import Card from "./Card";

const UpdateInfo = () => {
  const [name, setName] = useState(() => {
    return localStorage.getItem("username") || "İstifadəçi";
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const isEmailValid =
    email === "" || (email.includes("@") && email.includes("."));
  const isPasswordValid = password === "" || password.length >= 6;
  const doPasswordsMatch = password === confirmPassword;

  const isFormValid = isEmailValid && isPasswordValid && doPasswordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setMessage("Bütün sahələri düzgün doldurun.");
      setMessageType("error");
      return;
    }
    setMessage("Profil uğurla yeniləndi!");
    setMessageType("success");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        title="Profil məlumatlarını yeniləyin"
        icon={<UserCog className="h-5 w-5" />}
        className="w-full"
      >
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium mb-2">Ad:</label>
            <input
              type="text"
              value={name}
              disabled
              className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover opacity-70 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">E-poçt:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full text-black p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors ${
                !isEmailValid && email ? "border-red-500" : ""
              }`}
              placeholder="E-poçt ünvanınızı daxil edin"
            />
            {!isEmailValid && email && (
              <p className="text-red-500 text-sm mt-1">
                Düzgün e-poçt ünvanı daxil edin
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Telefon nömrəsi:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 text-black rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors"
              placeholder="+994 XX XXX XX XX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Yeni şifrə:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 text-black rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors ${
                !isPasswordValid && password ? "border-red-500" : ""
              }`}
              placeholder="Yeni şifrə (min. 6 simvol)"
            />
            {!isPasswordValid && password && (
              <p className="text-red-500 text-sm mt-1">
                Şifrə ən azı 6 simvol olmalıdır
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Şifrəni təsdiqləyin:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 text-black rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors ${
                !doPasswordsMatch && confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Şifrəni təkrar daxil edin"
            />
            {!doPasswordsMatch && confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Şifrələr uyğun gəlmir</p>
            )}
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                messageType === "success"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-6 rounded-xl flex items-center justify-center transition-all bg-orange-teal-gradient text-white hover-lift ${
              !isFormValid ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Profili yenilə
          </button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateInfo;
