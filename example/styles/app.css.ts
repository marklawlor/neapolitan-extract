import { style } from "@vanilla-extract/css";

export const hero = style({
  fontSize: 64,
  fontWeight: "bold",
});

export const title = style({
  fontSize: 64,
  fontWeight: "bold",
});

export const subtitle = style({
  fontSize: 36,
  color: "#38434D",
});

export const main = style({
  flex: 1,
  justifyContent: "center",
  maxWidth: 960,
});

export const container = style({
  flex: 1,
  alignItems: "center",
  padding: 24,
});
