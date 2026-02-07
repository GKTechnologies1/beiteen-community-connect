import { useEffect } from "react";

const SITE_NAME = "Beiteen Association U.S.A.";

/**
 * Sets document.title for SEO. Pass a page-specific title.
 * Output: "Page Title | Beiteen Association U.S.A."
 */
export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);
};
