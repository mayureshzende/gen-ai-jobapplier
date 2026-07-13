import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// Initialize theme immediately before any components render
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.classList.add(savedTheme);
  return savedTheme;
};

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => initializeTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    console.log("[ThemeContext] Theme changed to:", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
