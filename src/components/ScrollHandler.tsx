// src/components/ScrollHandler.tsx
import { useEffect } from "react";

export default function ScrollHandler() {
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const body = document.body;

    const handleScroll = () => {
      body.classList.add("scroll-active");

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        body.classList.remove("scroll-active");
      }, 2000);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null; // no UI
}
