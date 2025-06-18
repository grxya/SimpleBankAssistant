"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import {
  CreditCard,
  DollarSign,
  FileText,
  History,
  AlertCircle,
} from "lucide-react";
import { useLoanState, useLoan } from "../store/hooks/useLoanHook";

const LoansSection = () => {
  const { isLoadingApply, isLoading } = useLoanState();

  const [amount, setAmount] = useState("");
  const [loanTermInMonths, setLoanTermInMonths] = useState("6");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [ibanSuffix, setIbanSuffix] = useState("");
  const [applyMessage, setApplyMessage] = useState("");

  const [currentDebt, setCurrentDebt] = useState(null);
  const [totalDebt, setTotalDebt] = useState(null);
  const [loanHistory, setLoanHistory] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const loanTerms = [
    { value: "6", label: "6 ay" },
    { value: "12", label: "12 ay" },
    { value: "24", label: "24 ay" },
    { value: "36", label: "36 ay" },
    { value: "48", label: "48 ay" },
    { value: "60", label: "60 ay" },
  ];

  const loanPurposes = [
    "Ev alışı",
    "Avtomobil alışı",
    "Təhsil",
    "Biznes",
    "Şəxsi ehtiyaclar",
    "Digər",
  ];

  const { ApplyForLoan, GetLoanDebt, GetTotalLoanDebt, GetLoanHistory } =
    useLoan();

  useEffect(() => {
    handleGetCurrentDebt();
    handleGetTotalDebt();
    handleGetLoanHistory();
  }, [refreshFlag]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleApplyForLoan = async (e) => {
    e.preventDefault();
    if (!amount || !loanPurpose || !ibanSuffix) {
      setApplyMessage("❌ Bütün sahələri doldurun");
      return;
    }

    try {
      const result = await ApplyForLoan({
        amount: parseFloat(amount),
        loanTermInMonths: parseInt(loanTermInMonths),
        loanPurpose,
        ibanSuffix,
      });

      if (result.type === "loans/apply/rejected") {
        setApplyMessage(`❌ Xəta: ${result}`);
      } else {
        setRefreshFlag((prev) => !prev);
        setApplyMessage("✅ Kredit müraciəti uğurla göndərildi!");
        setAmount("");
        setLoanPurpose("");
        setIbanSuffix("");
        setLoanTermInMonths("6");
        setTimeout(() => setApplyMessage(""), 6000);
      }
    } catch (error) {
      setApplyMessage(`❌ Xəta: ${error}`);
    }
  };

  const handleGetCurrentDebt = async () => {
    try {
      const result = await GetLoanDebt();
      console.log(result);
      setCurrentDebt(result.payload);
    } catch (error) {
      console.error("Current debt fetch error:", error);
    }
  };

  const handleGetTotalDebt = async () => {
    try {
      const result = await GetTotalLoanDebt();
      setTotalDebt(result.payload);
    } catch (error) {
      console.error("Total debt fetch error:", error);
    }
  };

  const handleGetLoanHistory = async () => {
    try {
      const result = await GetLoanHistory();
      setLoanHistory(result.payload || []);
    } catch (error) {
      console.error("Loan history fetch error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 display-font">
          Kredit İdarəetməsi 💰
        </h1>
        <p className="text-muted">Kredit müraciətləri və borc məlumatları</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Apply for Loan */}
        <Card
          title="Kredit Müraciəti"
          icon={<FileText className="h-5 w-5" />}
          className="lg:col-span-2"
        >
          <form onSubmit={handleApplyForLoan} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">
                  Kredit məbləği (AZN):
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
                  placeholder="Məbləği daxil edin"
                  min="100"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Kredit müddəti:
                </label>
                <select
                  value={loanTermInMonths}
                  onChange={(e) => setLoanTermInMonths(e.target.value)}
                  className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
                >
                  {loanTerms.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Kredit məqsədi:
                </label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
                >
                  <option value="">-- Məqsəd seçin --</option>
                  {loanPurposes.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  IBAN son hissəsi:
                </label>
                <input
                  type="text"
                  value={ibanSuffix}
                  onChange={(e) => setIbanSuffix(e.target.value)}
                  className="w-full p-3 rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors text-black"
                  placeholder="Məsələn: 1944"
                  maxLength="4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingApply}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoadingApply ? "Göndərilir..." : "Kredit Müraciəti Et"}
            </button>

            {applyMessage && (
              <p className="text-center font-medium">{applyMessage}</p>
            )}
          </form>
        </Card>

        {/* Current Debt */}
        <Card title="Cari Borc" icon={<AlertCircle className="h-5 w-5" />}>
          <div className="space-y-4">
            <button
              onClick={handleGetCurrentDebt}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Yüklənir..." : "Cari Borcu Yenilə"}
            </button>

            {currentDebt && (
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <h3 className="font-semibold mb-2">Cari Borc Məlumatı:</h3>
                <p>Məbləğ: {currentDebt.principal} AZN</p>
                <p>Faiz dərəcəsi: {currentDebt.interestRate}%</p>
                <p>Kredit müddəti: {currentDebt.loanTermInMonths} ay</p>
                <p>Ümumi borc: {currentDebt.totalDebt} AZN</p>
                <p>Kredit məqsədi: {currentDebt.loanPurpose}</p>
              </div>
            )}

            {!currentDebt && !isLoading && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-green-600">✅ Aktiv borcunuz yoxdur</p>
              </div>
            )}
          </div>
        </Card>

        {/* Total Debt */}
        <Card title="Ümumi Borc" icon={<DollarSign className="h-5 w-5" />}>
          <div className="space-y-4">
            <button
              onClick={handleGetTotalDebt}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Yüklənir..." : "Ümumi Borcu Yenilə"}
            </button>

            {totalDebt && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <h3 className="font-semibold mb-2">Ümumi Borc Məlumatı:</h3>
                <p className="text-lg font-bold">
                  Ümumi borc: {totalDebt.totalDebt} AZN
                </p>
                <p>Aktiv kreditlərin sayı: {totalDebt.loanCount}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Loan History */}
        <Card
          title="Kredit Tarixçəsi"
          icon={<History className="h-5 w-5" />}
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            <button
              onClick={handleGetLoanHistory}
              disabled={isLoading}
              className="py-2 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Yüklənir..." : "Tarixçəni Yenilə"}
            </button>

            {loanHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-hover">
                      <th className="text-left py-3 px-4">İban</th>
                      <th className="text-left py-3 px-4">Tarix</th>
                      <th className="text-left py-3 px-4">Məbləğ</th>
                      <th className="text-left py-3 px-4">Faiz dərəcəsi</th>
                      <th className="text-left py-3 px-4">Müddət</th>
                      <th className="text-left py-3 px-4">Məqsəd</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanHistory
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.operationDate) - new Date(a.operationDate)
                      )
                      .map((loan) => (
                        <tr
                          key={loan.loanId}
                          className="border-b border-surface-hover"
                        >
                          <td className="py-3 px-4">{loan.iban}</td>
                          <td className="py-3 px-4">
                            {formatDate(loan.operationDate)}
                          </td>
                          <td className="py-3 px-4">{loan.amount} AZN</td>
                          <td className="py-3 px-4">{loan.interestRate}%</td>
                          <td className="py-3 px-4">
                            {loan.loanTermInMonths} ay
                          </td>
                          <td className="py-3 px-4">{loan.loanPurpose}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-md">
                <p className="text-center text-muted">
                  Kredit tarixçəsi tapılmadı
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoansSection;
