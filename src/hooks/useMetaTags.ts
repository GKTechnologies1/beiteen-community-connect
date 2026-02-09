import { useEffect } from "react";

interface MetaTagsConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const BASE_URL = "https://beiteen-community-connect.lovable.app";
const DEFAULT_IMAGE = "/beiteen-logo.png";

/**
 * Sets Open Graph and Twitter Card meta tags for social sharing.
 */
export const useMetaTags = ({ title, description, path, image }: MetaTagsConfig) => {
  useEffect(() => {
    const ogImage = image || DEFAULT_IMAGE;
    const fullUrl = `${BASE_URL}${path}`;
    const fullImageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

    const tags: Record<string, string> = {
      "og:title": title,
      "og:description": description,
      "og:type": "website",
      "og:url": fullUrl,
      "og:image": fullImageUrl,
      "og:site_name": "Beiteen Association U.S.A.",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": fullImageUrl,
    };

    Object.entries(tags).forEach(([property, content]) => {
      const isOg = property.startsWith("og:");
      const selector = isOg
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(isOg ? "property" : "name", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }, [title, description, path, image]);
};
