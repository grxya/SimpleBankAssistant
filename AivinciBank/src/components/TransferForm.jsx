"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightLeft } from "lucide-react";
import Card from "./Card";

const TransferForm = () => {
  const [senderIban, setSenderIban] = useState("");
  const [receiverIban, setReceiverIban] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("AZN");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  // Basic IBAN validation (length and format)
  const validateIban = (iban) => {
    const cleanIban = iban.replace(/\s/g, "").toUpperCase();
    return (
      cleanIban.length >= 15 &&
      cleanIban.length <= 34 &&
      /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleanIban)
    );
  };

  const formatIban = (iban) => {
    const cleanIban = iban.replace(/\s/g, "").toUpperCase();
    return cleanIban.replace(/(.{4})/g, "$1 ").trim();
  };

  const isFormValid =
    senderIban &&
    validateIban(receiverIban) &&
    amount &&
    Number.parseFloat(amount) > 0 &&
    currency;

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowOtp(true);
      setMessage("");
    } else {
      setMessage("Bütün sahələri düzgün doldurun. IBAN formatını yoxlayın.");
      setMessageType("error");
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      setMessage("Köçürmə uğurla tamamlandı!");
      setMessageType("success");
      setTimeout(() => {
        setSenderIban("");
        setReceiverIban("");
        setAmount("");
        setCurrency("AZN");
        setOtp("");
        setShowOtp(false);
        setMessage("");
        navigate("/user");
      }, 2000);
    } else {
      setMessage("OTP kodu yanlışdır.");
      setMessageType("error");
    }
  };

  const handleReceiverIbanChange = (e) => {
    const value = e.target.value.replace(/[^A-Z0-9\s]/gi, "").toUpperCase();
    if (value.length <= 34) {
      setReceiverIban(formatIban(value));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        title="IBAN ilə pul köçürməsi"
        icon={<ArrowRightLeft className="h-5 w-5" />}
        className="w-full"
      >
        <form
          onSubmit={showOtp ? handleFinalSubmit : handleInitialSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Göndərən IBAN:
            </label>
            <select
              value={senderIban}
              onChange={(e) => setSenderIban(e.target.value)}
              className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              disabled={showOtp}
            >
              <option value="">-- IBAN seçin --</option>
              <option value="AZ21NABZ00000000137010001944">
                AZ21 NABZ 0000 0000 1370 1000 1944
              </option>
              <option value="AZ77AIIB37120001944000000001">
                AZ77 AIIB 3712 0001 9440 0000 0001
              </option>
              <option value="AZ96AZEJ00000000001234567890">
                AZ96 AZEJ 0000 0000 0012 3456 7890
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Alıcı IBAN:
            </label>
            <input
              type="text"
              value={receiverIban}
              onChange={handleReceiverIbanChange}
              className={`w-full p-3 rounded-md bg-surface-hover border transition-colors text-black font-mono ${
                receiverIban && !validateIban(receiverIban)
                  ? "border-red-500 focus:border-red-500"
                  : "border-surface-hover focus:border-lime-500"
              } focus:outline-none`}
              placeholder="AZ21 NABZ 0000 0000 1370 1000 1944"
              disabled={showOtp}
            />
            {receiverIban && !validateIban(receiverIban) && (
              <p className="text-red-500 text-xs mt-1">
                IBAN formatı düzgün deyil (15-34 simvol, AZ21 ilə başlamalıdır)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Məbləğ:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-black p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors"
              min="0.01"
              step="0.01"
              placeholder="Məbləği daxil edin"
              disabled={showOtp}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Valyuta:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full text-black p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors"
              disabled={showOtp}
            >
              <option value="AZN">AZN - Azərbaycan Manatı</option>
              <option value="USD">USD - ABŞ Dolları</option>
              <option value="EUR">EUR - Avro</option>
              <option value="GBP">GBP - İngilis Funtu</option>
              <option value="RUB">RUB - Rus Rublu</option>
              <option value="TRY">TRY - Türk Lirəsi</option>
            </select>
          </div>

          {showOtp && (
            <div>
              <label className="block text-sm font-medium mb-2">OTP kod:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-center text-xl tracking-widest text-black"
                placeholder="000000"
                maxLength="6"
              />
              <p className="text-xs text-muted mt-2 text-center">
                Telefonunuza göndərilən 6 rəqəmli kodu daxil edin
              </p>
            </div>
          )}

          {message && (
            <div
              className={`p-3 rounded-md ${
                messageType === "success"
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
            >
              {message}
            </div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
            <h4 className="text-sm font-medium text-blue-600 mb-2">
              Köçürmə məlumatları:
            </h4>
            <div className="text-xs text-blue-600 space-y-1">
              <p>
                <strong>Göndərən:</strong>{" "}
                {senderIban ? formatIban(senderIban) : "Seçilməyib"}
              </p>
              <p>
                <strong>Alıcı:</strong> {receiverIban || "Daxil edilməyib"}
              </p>
              <p>
                <strong>Məbləğ:</strong>{" "}
                {amount ? `${amount} ${currency}` : "Daxil edilməyib"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-xl flex items-center justify-center transition-all bg-orange-teal-gradient text-white hover-lift ${
              (showOtp && otp.length !== 6) || (!showOtp && !isFormValid)
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
            disabled={
              (showOtp && otp.length !== 6) || (!showOtp && !isFormValid)
            }
          >
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            {showOtp ? "Köçürməni təsdiq et" : "Davam et"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default TransferForm;
