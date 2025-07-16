"use client"

import { useEffect, useState } from "react"
import { fetchUserWallet } from "../../../services/user/userWalletServices"
import ThemedTable from "../../UI/ThemedTable" // Updated import
import { useTheme } from "../../../contexts/ThemeContext" // Import useTheme

const UserWallet = () => {
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme, currentTheme } = useTheme()

  // Theme-based styling for UserWallet
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gray-50",
        containerBg: "bg-white",
        cardBg: "#ffffff",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        borderColor: "border-gray-200",
        tableHeaderBg: "bg-gray-50",
        hoverBg: "hover:bg-gray-50",
      }
    } else {
      return {
        mainBg: theme?.colors?.primaryBg || "bg-gray-900",
        containerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        cardBg: theme?.colors?.cardBg || "#374151",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        borderColor: "border-gray-600",
        tableHeaderBg: theme?.colors?.tableHeaderBg || "bg-gray-800",
        hoverBg: "hover:bg-gray-600",
      }
    }
  }
  const styles = getThemeStyles()

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const res = await fetchUserWallet()
        setWallet(res.data.wallet)
        setTransactions(res.data.transactions)
      } catch (err) {
        console.error("Failed to fetch wallet", err)
        // Optionally show a toast error here
      } finally {
        setLoading(false)
      }
    }
    loadWallet()
  }, [])

  // Define columns for the wallet transactions table
  const walletTransactionColumns = [
    {
      header: "Date",
      accessor: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      header: "Type",
      accessor: "type",
      render: (type) => <span className="capitalize">{type.replace("_", " ")}</span>,
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (amount) => `₹${amount}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (status) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "completed"
              ? "bg-green-100 text-green-800"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (description) => description,
    },
  ]

  if (loading) {
    return (
      <div
        className={`min-h-screen ${styles.mainBg} flex flex-col items-center justify-center p-4`}
        style={{
          background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
        }}
      >
        <div className="w-16 h-16 relative mb-6">
          <div
            className={`absolute top-0 right-0 bottom-0 left-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
          ></div>
        </div>
        <h2 className={`text-xl font-semibold ${styles.textSecondary}`}>Loading wallet info...</h2>
      </div>
    )
  }

  return (
    <div
      className={`p-4 max-w-3xl mx-auto ${styles.mainBg}`}
      style={{
        background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
      }}
    >
      <h1 className={`text-2xl font-semibold mb-4 ${styles.textPrimary}`}>My Wallet</h1>

      {wallet ? (
        <div
          className={`${styles.containerBg} shadow p-4 rounded mb-6 border ${styles.borderColor}`}
          style={{ background: styles.cardBg }}
        >
          <p className={`text-lg font-medium ${styles.textPrimary}`}>
            Balance: <span className="font-bold">₹{wallet.balance}</span>
          </p>
        </div>
      ) : (
        <div className={`text-lg ${styles.textMuted} text-center mb-6`}>Wallet information not available.</div>
      )}

      <h2 className={`text-xl font-semibold mb-4 ${styles.textPrimary}`}>Transaction History</h2>
      <ThemedTable columns={walletTransactionColumns} data={transactions} themeStyles={styles} />
    </div>
  )
}

export default UserWallet
