"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApplyForLoanAction,
  GetLoanDebtAction,
  GetTotalLoanDebtAction,
  GetLoanHistoryAction,
} from "../store/actions/loanAction";
import Card from "./Card";
import {
  CreditCard,
  DollarSign,
  FileText,
  History,
  AlertCircle,
} from "lucide-react";

const LoansSection = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.history || {});

  // Apply for Loan State
  const [amount, setAmount] = useState("");
  const [loanTermInMonths, setLoanTermInMonths] = useState("12");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [ibanSuffix, setIbanSuffix] = useState("");
  const [applyMessage, setApplyMessage] = useState("");

  // Debt Information State
  const [currentDebt, setCurrentDebt] = useState(null);
  const [totalDebt, setTotalDebt] = useState(null);
  const [loanHistory, setLoanHistory] = useState([]);

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

  useEffect(() => {
    // Load debt information on component mount
    handleGetCurrentDebt();
    handleGetTotalDebt();
    handleGetLoanHistoryAction();
  }, []);

  const handleApplyForLoanAction = async (e) => {
    e.preventDefault();
    if (!amount || !loanPurpose || !ibanSuffix) {
      setApplyMessage("❌ Bütün sahələri doldurun");
      return;
    }

    try {
      await dispatch(
        ApplyForLoanAction({
          amount: parseFloat(amount),
          loanTermInMonths: parseInt(loanTermInMonths),
          loanPurpose,
          ibanSuffix,
        })
      ).unwrap();

      setApplyMessage("✅ Kredit müraciəti uğurla göndərildi!");
      setAmount("");
      setLoanPurpose("");
      setIbanSuffix("");
      setTimeout(() => setApplyMessage(""), 3000);
    } catch (error) {
      setApplyMessage(`❌ Xəta: ${error}`);
    }
  };

  const handleGetCurrentDebt = async () => {
    try {
      const result = await dispatch(GetLoanDebtAction()).unwrap();
      setCurrentDebt(result);
    } catch (error) {
      console.error("Current debt fetch error:", error);
    }
  };

  const handleGetTotalDebt = async () => {
    try {
      const result = await dispatch(GetTotalLoanDebtAction()).unwrap();
      setTotalDebt(result);
    } catch (error) {
      console.error("Total debt fetch error:", error);
    }
  };

  const handleGetLoanHistoryAction = async () => {
    try {
      const result = await dispatch(GetLoanHistoryAction()).unwrap();
      setLoanHistory(result || []);
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
          <form onSubmit={handleApplyForLoanAction} className="space-y-4">
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
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Göndərilir..." : "Kredit Müraciəti Et"}
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
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Yüklənir..." : "Cari Borcu Yenilə"}
            </button>

            {currentDebt && (
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <h3 className="font-semibold mb-2">Cari Borc Məlumatı:</h3>
                <p>Məbləğ: {currentDebt.amount} AZN</p>
                <p>Son ödəniş tarixi: {currentDebt.dueDate}</p>
                <p>Status: {currentDebt.status}</p>
              </div>
            )}

            {!currentDebt && (
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
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Yüklənir..." : "Ümumi Borcu Yenilə"}
            </button>

            {totalDebt && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <h3 className="font-semibold mb-2">Ümumi Borc Məlumatı:</h3>
                <p className="text-lg font-bold">
                  Ümumi borc: {totalDebt.totalAmount} AZN
                </p>
                <p>Aktiv kreditlər: {totalDebt.activeLoans}</p>
                <p>Aylıq ödəniş: {totalDebt.monthlyPayment} AZN</p>
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
              onClick={handleGetLoanHistoryAction}
              disabled={loading}
              className="py-2 px-4 bg-orange-teal-gradient text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Yüklənir..." : "Tarixçəni Yenilə"}
            </button>

            {loanHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-hover">
                      <th className="text-left py-3 px-4">Tarix</th>
                      <th className="text-left py-3 px-4">Məbləğ</th>
                      <th className="text-left py-3 px-4">Müddət</th>
                      <th className="text-left py-3 px-4">Məqsəd</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanHistory.map((loan, index) => (
                      <tr key={index} className="border-b border-surface-hover">
                        <td className="py-3 px-4">{loan.date}</td>
                        <td className="py-3 px-4">{loan.amount} AZN</td>
                        <td className="py-3 px-4">{loan.termInMonths} ay</td>
                        <td className="py-3 px-4">{loan.purpose}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              loan.status === "approved"
                                ? "bg-green-500/10 text-green-500"
                                : loan.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {loan.status === "approved"
                              ? "Təsdiqləndi"
                              : loan.status === "pending"
                              ? "Gözləyir"
                              : "Rədd edildi"}
                          </span>
                        </td>
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
