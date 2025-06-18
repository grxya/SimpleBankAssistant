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

const data = [
  { name: "January", income: 1200, expense: 800 },
  { name: "February", income: 1500, expense: 900 },
  { name: "March", income: 1700, expense: 1100 },
  { name: "April", income: 1300, expense: 950 },
  { name: "May", income: 1600, expense: 1000 },
  { name: "June", income: 1400, expense: 850 },
  { name: "July", income: 1800, expense: 1200 },
  { name: "August", income: 1600, expense: 1100 },
  { name: "September", income: 1700, expense: 1000 },
  { name: "October", income: 1900, expense: 1300 },
  { name: "November", income: 2000, expense: 1400 },
  { name: "December", income: 2100, expense: 1500 },
];

const UserPanel = () => {
  const [selectedSection, setSelectedSection] = useState("info");
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [loanHistory, setLoanHistory] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

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
      try {
        const result = await GetLoanHistory();
        setLoanHistory(result.payload || []);

        const transferResult = await GetTransferHistory();
        const incomeResult = await GetIncomeHistory();
        setTransferHistory(transferResult.payload || []);
        setIncomeHistory(incomeResult.payload || []);
      } catch (err) {
        console.error("Xəta baş verdi:", err);
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
                </div>
              </Card>

              <Card
                title="Kredit kateqoriyaları"
                icon={<ChartLineUp className="h-5 w-5" />}
              >
                <div className="h-[300px] flex items-center justify-center">
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
                        {data.map((entry, index) => (
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
                </div>
              </Card>

              <Card
                title="Son əməliyyatlar"
                icon={<ArrowRightLeft className="h-5 w-5" />}
                className="lg:col-span-2"
              >
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
                                tx.isIncome ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {tx.amount} {tx.currency}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
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
