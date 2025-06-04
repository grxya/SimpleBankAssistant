"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetTransferHistoryAction, GetAccountHistoryAction, GetLoanHistoryAction } from "../store/actions/historyAction"
import Card from "./Card"
import { ArrowRightLeft, CreditCard, DollarSign, RefreshCw } from "lucide-react"

const HistorySection = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.history || {});

  const [transferHistory, setTransferHistory] = useState([])
  const [accountHistory, setAccountHistory] = useState([])
  const [loanHistory, setLoanHistory] = useState([])
  const [activeTab, setActiveTab] = useState("transfers")

  

  useEffect(() => {
    // Load all histories on component mount
    handleGetTransferHistoryAction()
    handleGetAccountHistoryAction()
    handleGetLoanHistoryAction()
  }, [])

  const handleGetTransferHistoryAction = async () => {
    try {
      const result = await dispatch(GetTransferHistoryAction()).unwrap()
      setTransferHistory(result || [])
    } catch (error) {
      console.error("Transfer history fetch error:", error)
      // Mock data for demonstration
      setTransferHistory([
        {
          id: 1,
          date: "2025-06-01",
          senderIban: "AZ21NABZ00000000137010001944",
          receiverIban: "AZ77NABZ00000000137010001945",
          amount: 150.0,
          currency: "AZN",
          status: "completed",
          description: "Köçürmə",
        },
        {
          id: 2,
          date: "2025-05-28",
          senderIban: "AZ77NABZ00000000137010001945",
          receiverIban: "AZ21NABZ00000000137010001944",
          amount: 75.5,
          currency: "USD",
          status: "completed",
          description: "Geri köçürmə",
        },
      ])
    }
  }

  const handleGetAccountHistoryAction = async () => {
    try {
      const result = await dispatch(GetAccountHistoryAction()).unwrap()
      setAccountHistory(result || [])
    } catch (error) {
      console.error("Account history fetch error:", error)
      // Mock data for demonstration
      setAccountHistory([
        {
          id: 1,
          date: "2025-06-01",
          type: "deposit",
          amount: 500.0,
          currency: "AZN",
          description: "Maaş",
          balance: 1250.0,
        },
        {
          id: 2,
          date: "2025-05-30",
          type: "withdrawal",
          amount: 45.0,
          currency: "AZN",
          description: "Market alış-verişi",
          balance: 750.0,
        },
        {
          id: 3,
          date: "2025-05-29",
          type: "withdrawal",
          amount: 85.5,
          currency: "AZN",
          description: "Kommunal ödəniş",
          balance: 795.0,
        },
      ])
    }
  }

  const handleGetLoanHistoryAction = async () => {
    try {
      const result = await dispatch(GetLoanHistoryAction()).unwrap()
      setLoanHistory(result || [])
    } catch (error) {
      console.error("Loan history fetch error:", error)
      // Mock data for demonstration
      setLoanHistory([
        {
          id: 1,
          date: "2025-03-15",
          amount: 5000.0,
          termInMonths: 24,
          purpose: "Avtomobil alışı",
          status: "approved",
          monthlyPayment: 230.5,
          remainingAmount: 3500.0,
        },
        {
          id: 2,
          date: "2024-12-10",
          amount: 2000.0,
          termInMonths: 12,
          purpose: "Şəxsi ehtiyaclar",
          status: "completed",
          monthlyPayment: 180.0,
          remainingAmount: 0.0,
        },
      ])
    }
  }

  const tabs = [
    { id: "transfers", label: "Köçürmələr", icon: <ArrowRightLeft className="h-4 w-4" /> },
    { id: "accounts", label: "Hesab Tarixçəsi", icon: <CreditCard className="h-4 w-4" /> },
    { id: "loans", label: "Kredit Tarixçəsi", icon: <DollarSign className="h-4 w-4" /> },
  ]

  const refreshCurrentTab = () => {
    switch (activeTab) {
      case "transfers":
        handleGetTransferHistoryAction()
        break
      case "accounts":
        handleGetAccountHistoryAction()
        break
      case "loans":
        handleGetLoanHistoryAction()
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 display-font">Əməliyyat Tarixçəsi 📊</h1>
        <p className="text-muted">Bütün əməliyyatlarınızın tarixçəsi</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id ? "bg-orange-teal-gradient text-white" : "bg-surface-hover hover:bg-surface-hover/80"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}

        <button
          onClick={refreshCurrentTab}
          disabled={loading}
          className="flex items-center gap-2 py-2 px-4 rounded-md bg-surface-hover hover:bg-surface-hover/80 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Yenilə
        </button>
      </div>

      {/* Transfer History */}
      {activeTab === "transfers" && (
        <Card title="Köçürmə Tarixçəsi" icon={<ArrowRightLeft className="h-5 w-5" />}>
          {transferHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-hover">
                    <th className="text-left py-3 px-4">Tarix</th>
                    <th className="text-left py-3 px-4">Göndərən</th>
                    <th className="text-left py-3 px-4">Alan</th>
                    <th className="text-left py-3 px-4">Məbləğ</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transferHistory.map((transfer) => (
                    <tr key={transfer.id} className="border-b border-surface-hover">
                      <td className="py-3 px-4">{transfer.date}</td>
                      <td className="py-3 px-4 font-mono text-sm">...{transfer.senderIban.slice(-4)}</td>
                      <td className="py-3 px-4 font-mono text-sm">...{transfer.receiverIban.slice(-4)}</td>
                      <td className="py-3 px-4 font-semibold">
                        {transfer.amount} {transfer.currency}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transfer.status === "completed"
                              ? "bg-green-500/10 text-green-500"
                              : transfer.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {transfer.status === "completed"
                            ? "Tamamlandı"
                            : transfer.status === "pending"
                              ? "Gözləyir"
                              : "Uğursuz"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-md">
              <p className="text-center text-muted">Köçürmə tarixçəsi tapılmadı</p>
            </div>
          )}
        </Card>
      )}

      {/* Account History */}
      {activeTab === "accounts" && (
        <Card title="Hesab Tarixçəsi" icon={<CreditCard className="h-5 w-5" />}>
          {accountHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-hover">
                    <th className="text-left py-3 px-4">Tarix</th>
                    <th className="text-left py-3 px-4">Növ</th>
                    <th className="text-left py-3 px-4">Təsvir</th>
                    <th className="text-left py-3 px-4">Məbləğ</th>
                    <th className="text-left py-3 px-4">Balans</th>
                  </tr>
                </thead>
                <tbody>
                  {accountHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-surface-hover">
                      <td className="py-3 px-4">{transaction.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === "deposit"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {transaction.type === "deposit" ? "Daxilolma" : "Çıxış"}
                        </span>
                      </td>
                      <td className="py-3 px-4">{transaction.description}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          transaction.type === "deposit" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}
                        {transaction.amount} {transaction.currency}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {transaction.balance} {transaction.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-md">
              <p className="text-center text-muted">Hesab tarixçəsi tapılmadı</p>
            </div>
          )}
        </Card>
      )}

      {/* Loan History */}
      {activeTab === "loans" && (
        <Card title="Kredit Tarixçəsi" icon={<DollarSign className="h-5 w-5" />}>
          {loanHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-hover">
                    <th className="text-left py-3 px-4">Tarix</th>
                    <th className="text-left py-3 px-4">Məbləğ</th>
                    <th className="text-left py-3 px-4">Müddət</th>
                    <th className="text-left py-3 px-4">Məqsəd</th>
                    <th className="text-left py-3 px-4">Aylıq ödəniş</th>
                    <th className="text-left py-3 px-4">Qalan borc</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loanHistory.map((loan) => (
                    <tr key={loan.id} className="border-b border-surface-hover">
                      <td className="py-3 px-4">{loan.date}</td>
                      <td className="py-3 px-4 font-semibold">{loan.amount} AZN</td>
                      <td className="py-3 px-4">{loan.termInMonths} ay</td>
                      <td className="py-3 px-4">{loan.purpose}</td>
                      <td className="py-3 px-4">{loan.monthlyPayment} AZN</td>
                      <td className="py-3 px-4 font-semibold">{loan.remainingAmount} AZN</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            loan.status === "approved"
                              ? "bg-green-500/10 text-green-500"
                              : loan.status === "completed"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {loan.status === "approved"
                            ? "Aktiv"
                            : loan.status === "completed"
                              ? "Tamamlandı"
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
              <p className="text-center text-muted">Kredit tarixçəsi tapılmadı</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

export default HistorySection
