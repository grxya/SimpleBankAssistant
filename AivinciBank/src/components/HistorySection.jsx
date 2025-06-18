"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import {
  ArrowRightLeft,
  CreditCard,
  DollarSign,
  RefreshCw,
} from "lucide-react";

import { useHistoryState, useHistory } from "../store/hooks/useHistoryHook";

const HistorySection = () => {
  const { isLoading } = useHistoryState();

  const [transferHistory, setTransferHistory] = useState([]);
  const [accountHistory, setAccountHistory] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("transfers");

  const { GetTransferHistory, GetIncomeHistory, GetLoanHistory } = useHistory();

  useEffect(() => {
    handleGetTransferHistory();
    handleGetAccountHistory();
    handleGetLoanHistory();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleGetTransferHistory = async () => {
    try {
      const result = await GetTransferHistory();
      setTransferHistory(
        result.type == "history/transfer/fulfilled" ? result.payload : []
      );
    } catch (error) {
      console.error("Transfer history fetch error:", error);
    }
  };

  const handleGetAccountHistory = async () => {
    try {
      const result = await GetIncomeHistory();
      setAccountHistory(
        result.type == "history/income/fulfilled" ? result.payload : []
      );
    } catch (error) {
      console.error("Account history fetch error:", error);
    }
  };

  const incomeTransactions = [
    ...(accountHistory?.incomingTransfers || []).map((t) => ({
      date: formatDate(t.transferDate),
      iban: t.receiverIban,
      description: "Gəlir",
      amount: `${t.amount}`,
      currency: t.currency ?? "AZN",
    })),

    ...(accountHistory?.balanceIncomes || []).map((b) => ({
      date: formatDate(b.operationDate),
      iban: b.iban,
      description: "Balans artırma",
      amount: `${b.amount}`,
      currency: b.currency,
    })),
  ];

  const handleGetLoanHistory = async () => {
    try {
      const result = await GetLoanHistory();
      setLoanHistory(
        result.type == "history/loan/fulfilled" ? result.payload : []
      );
    } catch (error) {
      console.error("Loan history fetch error:", error);
    }
  };

  const tabs = [
    {
      id: "transfers",
      label: "Köçürmələr",
      icon: <ArrowRightLeft className="h-4 w-4" />,
    },
    {
      id: "accounts",
      label: "Gəlir Tarixçəsi",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: "loans",
      label: "Kredit Tarixçəsi",
      icon: <DollarSign className="h-4 w-4" />,
    },
  ];

  const refreshCurrentTab = () => {
    switch (activeTab) {
      case "transfers":
        handleGetTransferHistory();
        break;
      case "accounts":
        handleGetAccountHistory();
        break;
      case "loans":
        handleGetLoanHistory();
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 display-font">
          Əməliyyat Tarixçəsi 📊
        </h1>
        <p className="text-muted">Bütün əməliyyatlarınızın tarixçəsi</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-orange-teal-gradient text-white"
                : "bg-surface-hover hover:bg-surface-hover/80"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}

        <button
          onClick={refreshCurrentTab}
          disabled={isLoading}
          className="flex items-center gap-2 py-2 px-4 rounded-md bg-surface-hover hover:bg-surface-hover/80 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Yenilə
        </button>
      </div>

      {/* Transfer History */}
      {activeTab === "transfers" && (
        <Card
          title="Köçürmə Tarixçəsi"
          icon={<ArrowRightLeft className="h-5 w-5" />}
        >
          {transferHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-hover">
                    <th className="text-left py-3 px-4">Tarix</th>
                    <th className="text-left py-3 px-4">Göndərən</th>
                    <th className="text-left py-3 px-4">Alan</th>
                    <th className="text-left py-3 px-4">Məbləğ</th>
                  </tr>
                </thead>
                <tbody>
                  {transferHistory
                    .sort(
                      (a, b) =>
                        new Date(b.transferDate) - new Date(a.transferDate)
                    )
                    .map((transfer) => (
                      <tr
                        key={transfer.id}
                        className="border-b border-surface-hover"
                      >
                        <td className="py-3 px-4">
                          {formatDate(transfer.transferDate)}
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">
                          ...{transfer.senderIban.slice(-4)}
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">
                          ...{transfer.receiverIban.slice(-4)}
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          {transfer.amount} AZN
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-md">
              <p className="text-center text-muted">
                {isLoading ? "Yüklənir..." : "Hələ heç bir köçürmə edilməyib"}
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Account History */}
      {activeTab === "accounts" && (
        <Card title="Gəlir Tarixçəsi" icon={<CreditCard className="h-5 w-5" />}>
          {incomeTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-hover">
                    <th className="text-left py-3 px-4">Tarix</th>
                    <th className="text-left py-3 px-4">iban</th>
                    <th className="text-left py-3 px-4">Növ</th>
                    <th className="text-left py-3 px-4">Məbləğ</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeTransactions
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-surface-hover"
                      >
                        <td className="py-3 px-4">{transaction.date}</td>
                        <td className="py-3 px-4">{transaction.iban}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              transaction.description === "Gəlir"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-yellow-500"
                            }`}
                          >
                            {transaction.description}
                          </span>
                        </td>
                        <td className={`py-3 px-4 font-semibold `}>
                          {transaction.amount} {transaction.currency}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-md">
              <p className="text-center text-muted">
                {isLoading ? "Yüklənir..." : "Hələ heç bir gəlir qeydə alınmayıb"}
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Loan History */}
      {activeTab === "loans" && (
        <Card
          title="Kredit Tarixçəsi"
          icon={<DollarSign className="h-5 w-5" />}
        >
          {loanHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-hover">
                    <th className="text-left py-3 px-4">Tarix</th>
                    <th className="text-left py-3 px-4">İban</th>
                    <th className="text-left py-3 px-4">Məqsəd</th>
                    <th className="text-left py-3 px-4">Məbləğ</th>
                    <th className="text-left py-3 px-4">Faiz dərəcəsi</th>
                    <th className="text-left py-3 px-4">Müddət</th>
                  </tr>
                </thead>
                <tbody>
                  {loanHistory
                    .sort(
                      (a, b) =>
                        new Date(b.operationDate) - new Date(a.operationDate)
                    )
                    .map((loan) => (
                      <tr
                        key={loan.id}
                        className="border-b border-surface-hover"
                      >
                        <td className="py-3 px-4">
                          {formatDate(loan.operationDate)}
                        </td>
                        <td className="py-3 px-4">{loan.iban}</td>
                        <td className="py-3 px-4">{loan.loanPurpose}</td>
                        <td className="py-3 px-4 font-semibold">
                          {loan.amount} AZN
                        </td>
                        <td className="py-3 px-4">{loan.interestRate}%</td>
                        <td className="py-3 px-4">
                          {loan.loanTermInMonths} ay
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-md">
              <p className="text-center text-muted">
                {isLoading ? "Yüklənir..." : "Hələ heç bir kredit götürülməyib"}
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default HistorySection;
