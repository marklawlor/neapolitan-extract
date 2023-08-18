import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    background: "#8b8",
    headerBackground: "#222",
    headerText: "#fff",
    accent: "#080",
  },
});