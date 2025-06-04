"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import {
  CreditCard,
  Plus,
  DollarSign,
  RefreshCw,
  Trash2,
  Eye,
} from "lucide-react";
import { useCustomerAccount } from "../store/hooks/useCustomerAccountHook";

const AccountsSection = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.history || {});

  const [currency, setCurrency] = useState("AZN");
  const [createMessage, setCreateMessage] = useState("");

  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceMessage, setBalanceMessage] = useState("");

  const [viewAccountId, setViewAccountId] = useState("");
  const [currentBalance, setCurrentBalance] = useState(null);

  const [closeAccountId, setCloseAccountId] = useState("");
  const [closeMessage, setCloseMessage] = useState("");

  const [convertAccountId, setConvertAccountId] = useState("");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertMessage, setConvertMessage] = useState("");

  const {
    CreateAccount,
    UpdateBalance,
    GetBalance,
    CloseAccount,
    ConvertCurrency,
  } = useCustomerAccount();

  const currencies = ["AZN", "USD", "EUR"];
  const mockAccounts = [
    { id: "acc_1", iban: "AZ21NABZ00000000137010001944", currency: "AZN" },
    { id: "acc_2", iban: "AZ77NABZ00000000137010001945", currency: "USD" },
  ];

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await CreateAccount({ currency });
      setCreateMessage("✅ Hesab uğurla yaradıldı!");
      setCurrency("AZN");
      setTimeout(() => setCreateMessage(""), 3000);
    } catch (error) {
      setCreateMessage(`❌ Xəta: ${error.message || error}`);
    }
  };

  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    if (!selectedAccountId || !balanceAmount) {
      setBalanceMessage("❌ Bütün sahələri doldurun");
      return;
    }

    try {
      await UpdateBalance({
        accountId: selectedAccountId,
        BalanceUpdateDTO: { amount: parseFloat(balanceAmount) },
      });
      setBalanceMessage("✅ Balans uğurla yeniləndi!");
      setBalanceAmount("");
      setTimeout(() => setBalanceMessage(""), 3000);
    } catch (error) {
      setBalanceMessage(`❌ Xəta: ${error.message || error}`);
    }
  };

  const handleGetBalance = async (e) => {
    e.preventDefault();
    if (!viewAccountId) return;

    try {
      const result = await GetBalance(viewAccountId);
      setCurrentBalance(result);
    } catch (error) {
      console.error("Balance fetch error:", error);
    }
  };

  const handleCloseAccount = async (e) => {
    e.preventDefault();
    if (!closeAccountId) {
      setCloseMessage("❌ Hesab seçin");
      return;
    }

    try {
      await CloseAccount(closeAccountId);
      setCloseMessage("✅ Hesab uğurla bağlandı!");
      setCloseAccountId("");
      setTimeout(() => setCloseMessage(""), 3000);
    } catch (error) {
      setCloseMessage(`❌ Xəta: ${error.message || error}`);
    }
  };

  const handleConvertCurrency = async (e) => {
    e.preventDefault();
    if (!convertAccountId || !toCurrency) {
      setConvertMessage("❌ Bütün sahələri doldurun");
      return;
    }

    try {
      await ConvertCurrency({
        accountId: convertAccountId,
        CurrencyConversionDTO: { toCurrency },
      });
      setConvertMessage("✅ Valyuta uğurla çevrildi!");
      setConvertAccountId("");
      setTimeout(() => setConvertMessage(""), 3000);
    } catch (error) {
      setConvertMessage(`❌ Xəta: ${error.message || error}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 display-font">
          Hesab İdarəetməsi 💳
        </h1>
        <p className="text-muted">Bank hesablarınızı idarə edin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Account */}
        <Card title="Yeni Hesab Yarat" icon={<Plus className="h-5 w-5" />}>
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Valyuta:</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Yaradılır..." : "Hesab Yarat"}
            </button>

            {createMessage && (
              <p className="text-center font-medium">{createMessage}</p>
            )}
          </form>
        </Card>

        {/* Update Balance */}
        <Card title="Balansı Yenilə" icon={<DollarSign className="h-5 w-5" />}>
          <form onSubmit={handleUpdateBalance} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Hesab:</label>
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              >
                <option value="">-- Hesab seçin --</option>
                {mockAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.iban} ({acc.currency})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Məbləğ:</label>
              <input
                type="number"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
                placeholder="Məbləği daxil edin"
                step="0.01"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Yenilənir..." : "Balansı Yenilə"}
            </button>

            {balanceMessage && (
              <p className="text-center font-medium">{balanceMessage}</p>
            )}
          </form>
        </Card>

        {/* Get Balance */}
        <Card title="Balansa Bax" icon={<Eye className="h-5 w-5" />}>
          <form onSubmit={handleGetBalance} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Hesab:</label>
              <select
                value={viewAccountId}
                onChange={(e) => setViewAccountId(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              >
                <option value="">-- Hesab seçin --</option>
                {mockAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.iban} ({acc.currency})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !viewAccountId}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Yüklənir..." : "Balansa Bax"}
            </button>

            {currentBalance && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-center font-medium text-green-600">
                  Balans: {currentBalance.amount} {currentBalance.currency}
                </p>
              </div>
            )}
          </form>
        </Card>

        {/* Convert Currency */}
        <Card title="Valyuta Çevir" icon={<RefreshCw className="h-5 w-5" />}>
          <form onSubmit={handleConvertCurrency} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Hesab:</label>
              <select
                value={convertAccountId}
                onChange={(e) => setConvertAccountId(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              >
                <option value="">-- Hesab seçin --</option>
                {mockAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.iban} ({acc.currency})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Yeni Valyuta:</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Çevrilir..." : "Valyuta Çevir"}
            </button>

            {convertMessage && (
              <p className="text-center font-medium">{convertMessage}</p>
            )}
          </form>
        </Card>

        {/* Close Account */}
        <Card
          title="Hesabı Bağla"
          icon={<Trash2 className="h-5 w-5" />}
          className="lg:col-span-2"
        >
          <form onSubmit={handleCloseAccount} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">
                Bağlanacaq Hesab:
              </label>
              <select
                value={closeAccountId}
                onChange={(e) => setCloseAccountId(e.target.value)}
                className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
              >
                <option value="">-- Hesab seçin --</option>
                {mockAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.iban} ({acc.currency})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4">
              <p className="text-red-600 text-sm">
                ⚠️ Diqqət: Hesabı bağladıqdan sonra bu əməliyyatı geri qaytarmaq
                mümkün deyil.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Bağlanır..." : "Hesabı Bağla"}
            </button>

            {closeMessage && (
              <p className="text-center font-medium">{closeMessage}</p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AccountsSection;
