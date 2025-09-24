"use client"

import { useEffect, useState } from "react"
import { fetchHostWallet } from "../../../services/host/hostWalletServices"
import ThemedTable from "../../ui/ThemedTable"
// import { useTheme } from "../../../contexts/ThemeContext"

const HostWallet = () => {
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  // const { theme, currentTheme } = useTheme()

  // Enhanced theme-based styling with success colors
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
        containerBg: "bg-white",
        cardBg: "#ffffff",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        borderColor: "border-gray-200",
        tableHeaderBg: "bg-gray-50",
        hoverBg: "hover:bg-gray-50",
        // Success theme colors
        successBg: "bg-green-50",
        successText: "text-green-800",
        successBorder: "border-green-200",
        successAccent: "text-green-600",
        // Button styles
        buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        buttonSecondary: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
      }
    } else {
      return {
        mainBg: "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900",
        containerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        cardBg: theme?.colors?.cardBg || "#374151",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        borderColor: "border-gray-600",
        tableHeaderBg: theme?.colors?.tableHeaderBg || "bg-gray-800",
        hoverBg: "hover:bg-gray-600",
        // Success theme colors for dark mode
        successBg: "bg-green-900/20",
        successText: "text-green-400",
        successBorder: "border-green-700",
        successAccent: "text-green-500",
        // Button styles for dark mode
        buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: "bg-blue-100 hover:bg-blue-200 text-blue-700",
      }
    }
  }

  const styles = getThemeStyles()

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const res = await fetchHostWallet()
        const { balance, transactions } = res.data
        setWallet({ balance })
        setTransactions(transactions)
      } catch (err) {
        console.error("Failed to fetch host wallet", err)
        // Optionally show a toast error here
      } finally {
        setLoading(false)
      }
    }

    loadWallet()
  }, [])

  // Enhanced status color function with success theme
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
      case "paid":
        return currentTheme === "classic"
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-green-900/20 text-green-400 border border-green-700"
      case "pending":
        return currentTheme === "classic"
          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
          : "bg-yellow-900/20 text-yellow-400 border border-yellow-700"
      case "failed":
      case "cancelled":
        return currentTheme === "classic"
          ? "bg-red-100 text-red-800 border border-red-200"
          : "bg-red-900/20 text-red-400 border border-red-700"
      default:
        return currentTheme === "classic"
          ? "bg-gray-100 text-gray-800 border border-gray-200"
          : "bg-gray-700 text-gray-300 border border-gray-600"
    }
  }

  // Enhanced transaction type color function
  const getTransactionTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "credit":
        return currentTheme === "classic"
          ? "bg-green-500 shadow-lg shadow-green-500/30"
          : "bg-green-400 shadow-lg shadow-green-400/30"
      case "debit":
        return currentTheme === "classic"
          ? "bg-red-500 shadow-lg shadow-red-500/30"
          : "bg-red-400 shadow-lg shadow-red-400/30"
      default:
        return currentTheme === "classic"
          ? "bg-blue-500 shadow-lg shadow-blue-500/30"
          : "bg-blue-400 shadow-lg shadow-blue-400/30"
    }
  }

  // Define columns for the host wallet transactions table
  const hostWalletTransactionColumns = [
    {
      header: "Date",
      accessor: "createdAt",
      render: (createdAt) => (
        <div className="flex flex-col space-y-1">
          <span className={`font-semibold text-sm ${styles.textPrimary}`}>
            {new Date(createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className={`text-xs ${styles.textMuted}`}>
            {new Date(createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      render: (type) => (
        <div className="flex items-center space-x-2">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${getTransactionTypeColor(type)}`}
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          ></div>
          <span className={`capitalize font-semibold text-sm ${styles.textPrimary}`}>{type.replace("_", " ")}</span>
        </div>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (amount, row) => (
        <span
          className={`font-bold text-sm transition-all duration-200 ${
            row.type === "credit"
              ? styles.successAccent
              : row.type === "debit"
                ? (currentTheme === "classic" ? "text-red-600" : "text-red-400")
                : styles.textPrimary
          }`}
        >
          {row.type === "credit" ? "+" : row.type === "debit" ? "-" : ""}₹{Math.abs(amount).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (status) => (
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 transform hover:scale-105 ${getStatusColor(status)}`}
          style={{
            animation: status === "pending" ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
          }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full mr-2 ${
              status === "completed" || status === "success" || status === "paid"
                ? currentTheme === "classic"
                  ? "bg-green-500"
                  : "bg-green-400"
                : status === "pending"
                  ? (currentTheme === "classic" ? "bg-yellow-500" : "bg-yellow-400")
                  : (currentTheme === "classic" ? "bg-red-500" : "bg-red-400")
            }`}
          ></div>
          {status}
        </span>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (description) => (
        <span
          className={`${styles.textSecondary} text-sm hover:${styles.textPrimary} transition-colors duration-200 cursor-help`}
          title={description}
        >
          {description}
        </span>
      ),
    },
  ]

  if (loading) {
    return (
      <div
        className={`min-h-screen ${styles.mainBg} flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8`}
        style={{
          background:
            currentTheme === "classic"
              ? "linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%)"
              : theme?.colors?.primaryBg || "linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)",
        }}
      >
        <div className="relative mb-8">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 border-4 ${
              currentTheme === "classic" ? "border-indigo-200 border-t-indigo-600" : "border-blue-200 border-t-blue-400"
            } rounded-full`}
            style={{
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <div
            className={`absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent ${
              currentTheme === "classic" ? "border-r-indigo-400" : "border-r-blue-300"
            } rounded-full`}
            style={{
              animation: "spin 1s linear infinite reverse",
              animationDelay: "0.15s",
            }}
          ></div>
        </div>
        <div className="text-center max-w-md">
          <h2 className={`text-xl sm:text-2xl font-bold ${styles.textPrimary} mb-3`}>Loading Host Wallet</h2>
          <p className={`${styles.textMuted} text-sm sm:text-base`}>
            Please wait while we fetch your host wallet information...
          </p>
          <div
            className="mt-6 flex justify-center space-x-1"
            style={{
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            <div
              className={`w-2 h-2 ${currentTheme === "classic" ? "bg-indigo-500" : "bg-blue-400"} rounded-full`}
            ></div>
            <div
              className={`w-2 h-2 ${currentTheme === "classic" ? "bg-indigo-500" : "bg-blue-400"} rounded-full`}
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className={`w-2 h-2 ${currentTheme === "classic" ? "bg-indigo-500" : "bg-blue-400"} rounded-full`}
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${styles.mainBg} py-4 sm:py-6 lg:py-8`}
      style={{
        background:
          currentTheme === "classic"
            ? "linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%)"
            : theme?.colors?.primaryBg || "linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className="mb-6 sm:mb-8"
          style={{
            animation: "fadeInUp 0.6s ease-out",
          }}
        >
          <div
            className={`${styles.containerBg} rounded-lg shadow-sm p-4 sm:p-6 border ${styles.borderColor}`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary} flex items-center`}>
                  <svg
                    className={`w-6 h-6 sm:w-7 sm:h-7 mr-3 ${currentTheme === "classic" ? "text-indigo-600" : "text-blue-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Host Wallet
                </h2>
                <p className={`mt-1 text-sm sm:text-base ${styles.textMuted}`}>
                  Manage your host earnings and view transaction history in one place.
                </p>
              </div>
              {/* Summary Stats */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="text-center">
                  <div className={`text-xl sm:text-2xl font-bold ${styles.textPrimary}`}>{transactions.length}</div>
                  <div className={`text-xs ${styles.textMuted}`}>Total Transactions</div>
                </div>
                {/* Remove these two stat blocks */}
                {/* <div className="text-center">
                  <div className={`text-xl sm:text-2xl font-bold ${styles.successAccent}`}>
                    {transactions.filter((t) => t.type === "credit").length}
                  </div>
                  <div className={`text-xs ${styles.textMuted}`}>Credits</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-xl sm:text-2xl font-bold ${currentTheme === "classic" ? "text-red-600" : "text-red-400"}`}
                  >
                    {transactions.filter((t) => t.type === "debit").length}
                  </div>
                  <div className={`text-xs ${styles.textMuted}`}>Debits</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Host Wallet Balance Card */}
        {wallet ? (
          <div
            className={`${styles.containerBg} shadow-xl hover:shadow-2xl p-4 sm:p-6 lg:p-8 rounded-2xl mb-6 sm:mb-8 border ${styles.borderColor} transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`}
            style={{
              background: styles.cardBg,
              animation: "slideInRight 0.6s ease-out",
              animationDelay: "0.2s",
              animationFillMode: "both",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"
              e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex-1">
                <p className={`text-xs sm:text-sm font-semibold ${styles.textMuted} uppercase tracking-wider mb-2`}>
                  Host Earnings Balance
                </p>
                <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${styles.textPrimary} mb-2`}>
                  ₹{wallet.balance.toLocaleString()}
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 ${styles.successAccent.includes("green") ? "bg-green-500" : "bg-green-400"} rounded-full`}
                    style={{
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  ></div>
                  <span className={`text-xs sm:text-sm ${styles.textMuted} font-medium`}>Available for Withdrawal</span>
                </div>
              </div>
              <div
                className={`${currentTheme === "classic" ? "bg-indigo-100" : "bg-blue-900/20"} p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:scale-110`}
                style={{
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                {/* Remove this entire svg element */}
                {/* <svg
                  className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${currentTheme === "classic" ? "text-indigo-600" : "text-blue-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg> */}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.containerBg} shadow-xl rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border ${styles.borderColor} text-center`}
            style={{
              background: styles.cardBg,
              animation: "fadeInUp 0.6s ease-out",
              animationDelay: "0.2s",
              animationFillMode: "both",
            }}
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 ${currentTheme === "classic" ? "bg-gray-100" : "bg-gray-700"} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110`}
            >
              <svg
                className={`w-8 h-8 sm:w-10 sm:h-10 ${styles.textMuted}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold ${styles.textPrimary} mb-2`}>Host Wallet Not Available</h3>
            <p className={`${styles.textMuted} text-sm sm:text-base`}>
              Host wallet information not available at this time.
            </p>
          </div>
        )}

        {/* Transaction History Section */}
        <div
          style={{
            animation: "slideInUp 0.6s ease-out",
            animationDelay: "0.4s",
            animationFillMode: "both",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${styles.textPrimary} mb-1`}>
                Host Transaction History
              </h2>
              <p className={`${styles.textMuted} text-sm sm:text-base lg:text-lg`}>
                {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div
              className={`${currentTheme === "classic" ? "bg-indigo-100" : "bg-blue-900/20"} p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110`}
              style={{
                animation: "float 3s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ${currentTheme === "classic" ? "text-indigo-600" : "text-blue-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m0 0V3m0 2v2M9 9h1m-1 4h1m5-4h1m-1 4h1m-5-4v4m5-4v4"
                />
              </svg>
            </div>
          </div>

          <ThemedTable columns={hostWalletTransactionColumns} data={transactions} themeStyles={styles} />
        </div>
      </div>

      {/* Inline Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}

export default HostWallet
