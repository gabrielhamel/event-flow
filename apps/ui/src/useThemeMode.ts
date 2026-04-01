import { useEffect, useState } from "react";

export const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return { mode: isDarkMode ? "dark" : "light" } as const;
};
