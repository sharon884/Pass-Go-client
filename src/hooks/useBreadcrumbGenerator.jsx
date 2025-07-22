import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";
import  breadcrumbMap  from "../constants/breadcrumbMap";

const useBreadcrumbGenerator = () => {
  const location = useLocation();
  const { updateBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const pathArray = pathSegments.map((_, idx) => "/" + pathSegments.slice(0, idx + 1).join("/"));

    const matchedCrumbs = pathArray.map((path) => {
      const matchedRoute = Object.keys(breadcrumbMap).find((pattern) =>
        matchPath({ path: pattern, end: true }, path)
      );

      if (matchedRoute) {
        return { label: breadcrumbMap[matchedRoute], path };
      }
      return null;
    }).filter(Boolean);

    updateBreadcrumbs(matchedCrumbs);
  }, [location.pathname]);
};

export default useBreadcrumbGenerator;
