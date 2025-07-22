import React, { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const updateBreadcrumbs = (newCrumbs) => {
    setBreadcrumbs(newCrumbs);
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, updateBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
