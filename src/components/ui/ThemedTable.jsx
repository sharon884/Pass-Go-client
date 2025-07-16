"use client"

const ThemedTable = ({ columns, data, themeStyles, onRowClick }) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`${themeStyles.containerBg} shadow-sm rounded-xl border ${themeStyles.borderColor} p-6 sm:p-8 text-center`}
        style={{
          background: themeStyles.cardBg, // Use cardBg for empty state background
        }}
      >
        <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className={`text-lg font-medium ${themeStyles.textPrimary} mb-2`}>No Data Found</h3>
        <p className={`${themeStyles.textMuted} mb-6`}>There are no items to display in this table.</p>
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden shadow-sm rounded-lg border ${themeStyles.borderColor} ${themeStyles.containerBg}`}
      style={{
        background: themeStyles.cardBg, // Use cardBg for table container background
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y" style={{ borderColor: themeStyles.borderColor }}>
          <thead style={{ background: themeStyles.tableHeaderBg }}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider`}
                  style={{ color: themeStyles.textMuted }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: themeStyles.borderColor }}>
            {data.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex} // Use _id if available, otherwise index
                className={`${themeStyles.hoverBg} transition-colors`}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={`px-4 py-4 text-sm min-w-0`} style={{ color: themeStyles.textPrimary }}>
                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ThemedTable
