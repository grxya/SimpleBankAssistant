"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import Card from "./Card";
import { useMoneyTransfer, useTransferState } from "../store/hooks/useMoneyTransfer";
import {
  useAccountState,
  useCustomerAccount,
} from "../store/hooks/useCustomerAccountHook";
import { useAuthState } from "../store/hooks/useAuthHook";

const TransferForm = () => {
  const [senderIban, setSenderIban] = useState("");
  const [receiverIban, setReceiverIban] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("AZN");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { VerifyOtp, InitiateTransfer } = useMoneyTransfer();
  const { GetIbans } = useCustomerAccount();

    const isLoading = useTransferState().isLoading;
  

  const user = useAuthState().user;

  const accounts = useAccountState().AccountsInfo;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        await GetIbans();
      } catch (err) {
        console.error("IBAN-ları çəkmək olmadı:", err);
      }
    };

    fetchAccounts();
  }, []);

  const validateIban = (iban) => {
    const cleanIban = iban.replace(/\s/g, "").toUpperCase();
    const regex = /^AZ\d{14}$/;
    return regex.test(cleanIban);
  };

  const formatIban = (iban) => {
    const cleanIban = iban.replace(/\s/g, "").toUpperCase();

    if (cleanIban.length !== 16) return cleanIban;

    return (
      cleanIban.slice(0, 4) +
      " " +
      cleanIban.slice(4, 8) +
      " " +
      cleanIban.slice(8, 12) +
      " " +
      cleanIban.slice(12, 16)
    );
  };

  const isFormValid =
    senderIban &&
    validateIban(receiverIban) &&
    amount &&
    Number.parseFloat(amount) > 0 &&
    currency;

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const result = await InitiateTransfer({
          senderIban,
          receiverIban: receiverIban.replace(/\s/g, ""),
          amount,
        });
        console.log(result);
        if (result.type === "transfers/initiate/rejected") {
          setMessage(`❌ Xəta: ${result.payload}`);
          setMessageType("error");
        } else {
          setShowOtp(true);
          setMessage("");
        }
      } catch (error) {
        setMessage(`❌ Xəta: ${error.message || error}`);
        setMessageType("error");
      }
    } else {
      setMessage("Bütün sahələri düzgün doldurun. IBAN formatını yoxlayın.");
      setMessageType("error");
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const result = await VerifyOtp({
      email: user.email,
      code: otp,
    });
    console.log(result);

    if (result.type === "transfers/verify-otp/rejected") {
      setMessage(`❌ Xəta: ${result.payload}`);
      setMessageType("error");
    } else {
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
      }, 6000);
    }
  };

  const handleReceiverIbanChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    let formatted = "";
    for (let i = 0; i < value.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        formatted += " ";
      }
      formatted += value[i];
    }

    setReceiverIban(formatted);
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
              onChange={(e) => {
                setSenderIban(e.target.value);

                const selectedAccount = accounts.find(
                  (acc) => acc.iban === e.target.value
                );
                if (selectedAccount) {
                  setCurrency(selectedAccount.currency);
                }
              }}
              className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              disabled={showOtp}
            >
              <option value="">-- IBAN seçin --</option>
              {accounts.map((acc) => (
                <option key={acc.customerId} value={acc.iban}>
                  {formatIban(acc.iban)} ({acc.currency})
                </option>
              ))}
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
              className={`w-full p-3 rounded-md bg-surface-hover border transition-colors text-black ${
                receiverIban && !validateIban(receiverIban)
                  ? "border-red-500 focus:border-red-500"
                  : "border-surface-hover focus:border-lime-500"
              } focus:outline-none`}
              placeholder="AZ21 0000 0000 1370"
              disabled={showOtp}
            />
            {receiverIban && !validateIban(receiverIban) && (
              <div className="text-red-500 text-xs mt-1">
                <p>IBAN formatı düzgün deyil:</p>
                <div className="pl-2">
                  <p>- 16 simvol olmalıdır</p>
                  <p>- "AZ" ilə başlamalıdır</p>
                  <p>- Qalan 14 simvol yalnız rəqəm olmalıdır</p>
                </div>
              </div>
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
              (showOtp && otp.length !== 6) || (!showOtp && !isFormValid) || (isLoading)
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
            disabled={
              (showOtp && otp.length !== 6) || (!showOtp && !isFormValid) || (isLoading)
            }
          >
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            {isLoading ? "Yüklənir..." : (showOtp ? "Köçürməni təsdiq et" : "Davam et")}

          </button>
        </form>
      </Card>
    </div>
  );
};

export default TransferForm;
