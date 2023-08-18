# Neapolitan Extract

It's [vanilla-extract](https://vanilla-extract.style/) but with more flavors! Neapolitan Extract extends Vanilla Extract to also compile styling for React Native platforms. Use CSS on web, and StyleSheet on native! This library uses `react-native-css-interop` for the native styling runtime.

This library is a work in progress.

## Compatibility

Just like Vanilla Extract, Neapolitan Extract assumes your bundler can support CSS bundling. As React Native CLI does not support CSS bundling, **only Expo SDK 49+** is supported.

## Installation

```bash
// Install using your favorite package manager
npm i neapolitan-extract
yarn add neapolitan-extract
pnpm i neapolitan-extract
```

```tsx
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNeapolitanExtract } = require("neapolitan-extract");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

module.exports = withNeapolitanExtract(config);
```

```tsx
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      // Make sure this plugin is last!!!
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
          importSource: "react-native-css-interop",
        },
      ],
    ],
  };
};
```

That's it. Start coding!

## Usage

```tsx filename=App.ts
import { Text, View } from "react-native";
import { title, subtitle, container, main } from "./app.css";

export default function Page() {
  return (
    <View className={container}>
      <View className={main}>
        <Text className={title}>Hello World</Text>
        <Text className={subtitle}>This is the first page of your app.</Text>
      </View>
    </View>
  );
}
```

```tsx filename=app.css.ts
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
```
