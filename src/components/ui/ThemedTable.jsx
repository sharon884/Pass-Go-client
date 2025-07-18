"use client"

import { useState } from "react"

const ThemedTable = ({ columns, data, themeStyles, onRowClick }) => {
  const [hoveredRow, setHoveredRow] = useState(null)

  if (!data || data.length === 0) {
    return (
      <div
        className={`${themeStyles.containerBg} shadow-xl rounded-2xl border ${themeStyles.borderColor} p-6 sm:p-8 lg:p-12 text-center transition-all duration-300 hover:shadow-2xl`}
        style={{
          background: themeStyles.cardBg,
          animation: "bounceIn 0.8s ease-out",
        }}
      >
        <div
          className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${
            themeStyles.textPrimary.includes("white") ? "from-blue-100 to-purple-100" : "from-indigo-100 to-purple-100"
          } rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 cursor-pointer`}
          style={{
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <svg
            className={`w-8 h-8 sm:w-10 sm:h-10 ${
              themeStyles.textPrimary.includes("white") ? "text-blue-400" : "text-indigo-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} mb-3`}>No Transactions Found</h3>
        <p className={`${themeStyles.textMuted} mb-8 text-sm sm:text-base lg:text-lg max-w-md mx-auto`}>
          You haven't made any transactions yet. When you do, they'll appear here for you to track and manage.
        </p>
        <button
          className={`px-4 sm:px-6 py-2 sm:py-3 ${themeStyles.buttonPrimary} rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 ${
            themeStyles.textPrimary.includes("white") ? "focus:ring-blue-300" : "focus:ring-indigo-300"
          }`}
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        >
          Make Your First Transaction
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table */}
      <div
        className={`hidden lg:block overflow-hidden shadow-xl hover:shadow-2xl rounded-2xl border ${themeStyles.borderColor} ${themeStyles.containerBg} transition-all duration-300`}
        style={{
          background: themeStyles.cardBg,
          animation: "slideInUp 0.6s ease-out",
        }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y" style={{ borderColor: themeStyles.borderColor }}>
            <thead style={{ background: themeStyles.tableHeaderBg }}>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-opacity-80"
                    style={{
                      color: themeStyles.textMuted,
                      animation: `slideInDown 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {column.sortable && (
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: themeStyles.borderColor }}>
              {data.map((row, rowIndex) => (
                <tr
                  key={row._id || rowIndex}
                  className={`${themeStyles.hoverBg} transition-all duration-300 ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${hoveredRow === rowIndex ? "shadow-lg transform scale-[1.01]" : ""}`}
                  onClick={() => onRowClick && onRowClick(row)}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    cursor: onRowClick ? "pointer" : "default",
                    animation: `fadeInUp 0.5s ease-out ${rowIndex * 0.05}s both`,
                    transform: hoveredRow === rowIndex ? "translateX(4px) scale(1.01)" : "translateX(0) scale(1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 sm:px-6 py-3 sm:py-4 text-sm min-w-0 whitespace-nowrap"
                      style={{ color: themeStyles.textPrimary }}
                    >
                      <div className="flex items-center">
                        {colIndex === 0 && onRowClick && (
                          <div
                            className={`w-1 h-6 sm:h-8 ${
                              themeStyles.textPrimary.includes("white") ? "bg-blue-400" : "bg-indigo-500"
                            } rounded-full mr-2 sm:mr-3 transition-all duration-300`}
                            style={{
                              opacity: hoveredRow === rowIndex ? 1 : 0,
                              transform: hoveredRow === rowIndex ? "scaleY(1)" : "scaleY(0.5)",
                            }}
                          ></div>
                        )}
                        <div className="min-w-0 flex-1">
                          {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enhanced Table Footer */}
        <div
          className={`px-4 sm:px-6 py-3 sm:py-4 border-t ${themeStyles.borderColor}`}
          style={{ background: themeStyles.tableHeaderBg }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 text-sm">
            <span className={`${themeStyles.textMuted} font-medium`}>
              Showing {data.length} transaction{data.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={row._id || rowIndex}
            className={`${themeStyles.containerBg} shadow-xl rounded-2xl border ${themeStyles.borderColor} overflow-hidden transition-all duration-300 hover:shadow-2xl`}
            style={{
              background: themeStyles.cardBg,
              animation: `fadeInUp 0.5s ease-out ${rowIndex * 0.1}s both`,
            }}
          >
            {/* Card Header */}
            <div
              className={`px-4 py-4 bg-opacity-50 border-b ${themeStyles.borderColor}`}
              style={{ background: themeStyles.tableHeaderBg }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        themeStyles.textPrimary.includes("white") ? "bg-blue-100" : "bg-indigo-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          themeStyles.textPrimary.includes("white") ? "text-blue-600" : "text-indigo-600"
                        }`}
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
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-semibold ${themeStyles.textPrimary}`}>
                      {row.description || "Transaction"}
                    </h3>
                    <p className={`text-sm ${themeStyles.textMuted}`}>
                      {new Date(row.createdAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {columns[3].render(row.status)}
                  <span
                    className={`text-lg font-bold ${
                      row.type === "credit"
                        ? themeStyles.successAccent
                        : row.type === "debit"
                          ? themeStyles.textPrimary.includes("white")
                            ? "text-red-400"
                            : "text-red-600"
                          : themeStyles.textPrimary
                    }`}
                  >
                    {row.type === "credit" ? "+" : row.type === "debit" ? "-" : ""}₹
                    {Math.abs(row.amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="px-4 py-4 space-y-3">
              {/* Transaction Type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      row.type === "credit"
                        ? themeStyles.textPrimary.includes("white")
                          ? "bg-green-400 shadow-lg shadow-green-400/30"
                          : "bg-green-500 shadow-lg shadow-green-500/30"
                        : row.type === "debit"
                          ? themeStyles.textPrimary.includes("white")
                            ? "bg-red-400 shadow-lg shadow-red-400/30"
                            : "bg-red-500 shadow-lg shadow-red-500/30"
                          : themeStyles.textPrimary.includes("white")
                            ? "bg-blue-400 shadow-lg shadow-blue-400/30"
                            : "bg-blue-500 shadow-lg shadow-blue-500/30"
                    }`}
                    style={{
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  ></div>
                  <span className={`capitalize font-semibold text-sm ${themeStyles.textPrimary}`}>
                    {row.type.replace("_", " ")}
                  </span>
                </div>
                <span className={`text-xs ${themeStyles.textMuted}`}>
                  {new Date(row.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Action Button */}
              {onRowClick && (
                <div className="pt-2">
                  <button
                    onClick={() => onRowClick(row)}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg ${themeStyles.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      themeStyles.textPrimary.includes("white") ? "focus:ring-blue-500" : "focus:ring-indigo-500"
                    } transition-all duration-300 hover:scale-105`}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inline Keyframes for Table */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
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
    </>
  )
}

export default ThemedTable
