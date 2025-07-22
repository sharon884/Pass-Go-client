import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrumb } from "../../../contexts/BreadcrumbContext";

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  const MAX_VISIBLE = 3;

  const collapsed =
    breadcrumbs.length > MAX_VISIBLE
      ? [
          breadcrumbs[0], // First
          { label: "...", path: null },
          ...breadcrumbs.slice(breadcrumbs.length - 2), // Last 2
        ]
      : breadcrumbs;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex flex-wrap items-center space-x-1">
        {collapsed.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            {crumb.path ? (
              <Link
                to={crumb.path}
                className="hover:underline text-blue-600 font-medium"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-500">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
