import { useEffect } from "react";

const SITE_NAME = "Beiteen Association U.S.A.";

/**
 * Sets document.title and meta description for SEO.
 * Output: "Page Title | Beiteen Association U.S.A."
 */
export const usePageTitle = (title?: string, metaDescription?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    if (metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", metaDescription);
    }

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, metaDescription]);
};
