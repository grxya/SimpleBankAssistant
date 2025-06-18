"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { LineChartIcon as ChartLineUp, ArrowRightLeft } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Modal from "../components/Modal";
import TransferForm from "../components/TransferForm";
import AccountsSection from "../components/AccountsSection";
import LoansSection from "../components/LoansSection";
import HistorySection from "../components/HistorySection";
import { useAuthState, useAuth } from "../store/hooks/useAuthHook";
import { useHistory } from "../store/hooks/useHistoryHook";

const UserPanel = () => {
  const [selectedSection, setSelectedSection] = useState("info");
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [loanHistory, setLoanHistory] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authState = useAuthState();

  const [name, setName] = useState(() => {
    return authState.user.fullname || "İstifadəçi";
  });

  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const { SignOut } = useAuth();
  const { GetTransferHistory, GetIncomeHistory, GetLoanHistory } = useHistory();

  const handleSignOut = () => {
    SignOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const result = await GetLoanHistory();
        setLoanHistory(result.payload || []);

        const transferResult = await GetTransferHistory();
        const incomeResult = await GetIncomeHistory();
        setTransferHistory(
          transferResult.type == "history/transfer/fulfilled"
            ? transferResult.payload
            : []
        );
        setIncomeHistory(
          incomeResult.type == "history/income/fulfilled"
            ? incomeResult.payload
            : []
        );
      } catch (err) {
        console.error("Xəta baş verdi:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const buildChartData = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getMonth = (timestamp) =>
      new Date(timestamp).toLocaleString("default", { month: "long" });

    const monthlyData = {};
    months.forEach((month) => {
      monthlyData[month] = { name: month, income: 0, expense: 0 };
    });

    const allIncomes = [
      ...(incomeHistory.incomingTransfers || []),
      ...(incomeHistory.balanceIncomes || []),
    ];

    const allExpenses = [...(transferHistory || [])];

    allIncomes.forEach((entry) => {
      const timestamp = entry.transferDate || entry.operationDate;
      const isSuccessful = entry.isSuccessful ?? true;
      const amount = entry.amount;

      if (!timestamp || !isSuccessful || !amount) return;

      const month = getMonth(timestamp);
      if (monthlyData[month]) {
        monthlyData[month].income += amount;
      }
    });

    allExpenses.forEach((entry) => {
      const timestamp = entry.transferDate;
      const isSuccessful = entry.isSuccessful ?? true;
      const amount = entry.amount;

      if (!timestamp || !isSuccessful || !amount) return;

      const month = getMonth(timestamp);
      if (monthlyData[month]) {
        monthlyData[month].expense += amount;
      }
    });

    return Object.values(monthlyData);
  };

  const pieData = loanHistory.reduce((acc, loan) => {
    const existing = acc.find((item) => item.name === loan.loanPurpose);
    if (existing) {
      existing.value += loan.amount;
    } else {
      acc.push({ name: loan.loanPurpose, value: loan.amount });
    }
    return acc;
  }, []);

  const transactions = [
    ...(transferHistory || []).map((t) => ({
      date: new Date(t.transferDate).toLocaleString(),
      iban: t.senderIban,
      description: "Transfer",
      amount: `-${t.amount}`,
      currency: t.currency ?? "AZN",
      isIncome: false,
    })),

    ...(incomeHistory?.incomingTransfers || []).map((t) => ({
      date: new Date(t.transferDate).toLocaleString(),
      iban: t.receiverIban,
      description: "Gəlir",
      amount: `+${t.amount}`,
      currency: t.currency ?? "AZN",
      isIncome: true,
    })),

    ...(incomeHistory?.balanceIncomes || []).map((b) => ({
      date: new Date(b.operationDate).toLocaleString(),
      iban: b.iban,
      description: "Balans artırma",
      amount: `+${b.amount}`,
      currency: b.currency,
      isIncome: true,
    })),
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "accounts":
        return <AccountsSection />;
      case "transfer":
        return <TransferForm />;
      case "loans":
        return <LoansSection />;
      case "history":
        return <HistorySection />;
      default:
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 display-font">
                Salam, {name} 👋
              </h1>
              <p className="text-muted">
                Aivinci Bank hesabınıza xoş gəlmisiniz
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                title="Gəlir və xərclər"
                icon={<ChartLineUp className="h-5 w-5" />}
              >
                <div className="h-[300px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        <p className="text-muted text-sm">
                          Məlumatlar yüklənir...
                        </p>
                      </div>
                    </div>
                  ) : buildChartData().every(
                      (item) => item.income === 0 && item.expense === 0
                    ) ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <ChartLineUp className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-muted text-lg font-medium">
                          Məlumat yoxdur
                        </p>
                        <p className="text-muted text-sm">
                          Hələ heç bir əməliyyat edilməyib
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={buildChartData()}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={darkMode ? "#333" : "#eee"}
                        />
                        <XAxis
                          dataKey="name"
                          stroke={darkMode ? "#ccc" : "#333"}
                        />
                        <YAxis stroke={darkMode ? "#ccc" : "#333"} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: darkMode ? "#1e1e2f" : "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="income"
                          name="Gəlir"
                          stroke="#65a30d"
                          strokeWidth={3}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="expense"
                          name="Xərc"
                          stroke="#f97316"
                          strokeWidth={3}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>

              <Card
                title="Kredit kateqoriyaları"
                icon={<ChartLineUp className="h-5 w-5" />}
              >
                <div className="h-[300px] flex items-center justify-center">
                  {isLoading ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                      <p className="text-muted text-sm">
                        Kredit məlumatları yüklənir...
                      </p>
                    </div>
                  ) : pieData.length === 0 ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                      <p className="text-muted text-lg font-medium">
                        Kredit yoxdur
                      </p>
                      <p className="text-muted text-sm">
                        Hələ heç bir kredit götürülməyib
                      </p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`hsl(${(index * 110) % 360}, 60%, 60%)`}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: darkMode ? "#1e1e2f" : "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>

              <Card
                title="Son əməliyyatlar"
                icon={<ArrowRightLeft className="h-5 w-5" />}
                className="lg:col-span-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500"></div>
                      <p className="text-muted text-sm">
                        Əməliyyat tarixçəsi yüklənir...
                      </p>
                    </div>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <ArrowRightLeft className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-muted text-lg font-medium">
                      Əməliyyat yoxdur
                    </p>
                    <p className="text-muted text-sm">
                      Hələ heç bir əməliyyat edilməyib
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-surface-hover">
                          <th className="text-left py-3 px-4">Tarix</th>
                          <th className="text-left py-3 px-4">Iban</th>
                          <th className="text-left py-3 px-4">Növ</th>
                          <th className="text-left py-3 px-4">Məbləğ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((tx, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-surface-hover"
                            >
                              <td className="py-3 px-4">{tx.date}</td>
                              <td className="py-3 px-4">{tx.iban}</td>
                              <td className="py-3 px-4">{tx.description}</td>
                              <td
                                className={`py-3 px-4 ${
                                  tx.isIncome
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {tx.amount} {tx.currency}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden animated-bg">
      {/* Creative elements */}
      <div className="creative-circle creative-circle-1"></div>
      <div className="creative-circle creative-circle-2"></div>
      <div className="creative-shape creative-shape-1 floating"></div>
      <div className="creative-shape creative-shape-2 floating-delay-1"></div>

      <Sidebar
        onSelectSection={setSelectedSection}
        onSignOutClick={() => setShowSignOutModal(true)}
        activeSection={selectedSection}
      />

      <main className="lg:ml-64 p-6 md:p-10 flex-grow">
        <div className="max-w-6xl mx-auto">
          {renderContent()}

          {showSignOutModal && (
            <Modal
              title="Çıxış"
              message="Hesabınızdan çıxmaq istədiyinizə əminsiniz?"
              onConfirm={handleSignOut}
              onCancel={() => setShowSignOutModal(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPanel;
