// frontend/src/context/ThemeProvider.jsx
import React, { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("system");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        const applyTheme = () => {
            const resolvedTheme =
                theme === "system"
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
                    : theme;
            root.classList.toggle("dark", resolvedTheme === "dark");
        };
        applyTheme();

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", applyTheme);
            return () => mediaQuery.removeEventListener("change", applyTheme);
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === "light") return "dark";
            if (prev === "dark") return "system";
            return "light";
        });

    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);