"use client";

import { useState } from "react";
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
import UpdateInfo from "../components/UpdateInfo";
import AccountsSection from "../components/AccountsSection";
import LoansSection from "../components/LoansSection";
import HistorySection from "../components/HistorySection";

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
  const [selectedCard, setSelectedCard] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [name, setName] = useState(() => {
    return localStorage.getItem("username") || "İstifadəçi";
  });

  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSignOut = () => {
    console.log("Signed out.");
    setShowSignOutModal(false);
    localStorage.removeItem("username");
    navigate("/");
  };

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
      case "update":
        return <UpdateInfo />;
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

            <div className="flex flex-wrap gap-4 mb-8">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-3 text-black rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-3 text-black rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <select
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                className="p-3 text-black rounded-md bg-surface-hover border border-surface-hover focus:outline-none focus:border-lime-500 transition-colors"
              >
                <option value="1">1111-2222-3333-4444</option>
                <option value="2">5555-6666-7777-8888</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                title="Gəlir və xərclər"
                icon={<ChartLineUp className="h-5 w-5" />}
              >
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                title="Xərc kateqoriyaları"
                icon={<ChartLineUp className="h-5 w-5" />}
              >
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Ərzaq", value: 400 },
                          { name: "Kommunal", value: 300 },
                          { name: "Nəqliyyat", value: 200 },
                          { name: "Əyləncə", value: 150 },
                        ]}
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
                            fill={
                              ["#65a30d", "#f97316", "#3b82f6", "#8b5cf6"][
                                index % 4
                              ]
                            }
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
                        <th className="text-left py-3 px-4">Təsvir</th>
                        <th className="text-left py-3 px-4">Məbləğ</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-surface-hover">
                        <td className="py-3 px-4">2025-06-01</td>
                        <td className="py-3 px-4">Market alış-verişi</td>
                        <td className="py-3 px-4 text-red-500">-45.00 AZN</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Tamamlandı
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-surface-hover">
                        <td className="py-3 px-4">2025-06-01</td>
                        <td className="py-3 px-4">Maaş</td>
                        <td className="py-3 px-4 text-green-500">
                          +1200.00 AZN
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Tamamlandı
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-surface-hover">
                        <td className="py-3 px-4">2025-05-29</td>
                        <td className="py-3 px-4">Kommunal ödəniş</td>
                        <td className="py-3 px-4 text-red-500">-85.50 AZN</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Tamamlandı
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-surface-hover">
                        <td className="py-3 px-4">2025-05-28</td>
                        <td className="py-3 px-4">Restoran</td>
                        <td className="py-3 px-4 text-red-500">-32.40 AZN</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Tamamlandı
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">2025-05-27</td>
                        <td className="py-3 px-4">Yanacaq</td>
                        <td className="py-3 px-4 text-red-500">-50.00 AZN</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            Tamamlandı
                          </span>
                        </td>
                      </tr>
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
