# Neapolitan Extract

It's [vanilla-extract](https://vanilla-extract.style/) but with more flavors! Neapolitan Extract extends Vanilla Extract to also compile styling for React Native platforms. Use CSS on web, and StyleSheet on native!

This library is a work in progress.

## Compatibility

Just like Vanilla Extract, Neapolitan Extract assumes your bundler can support CSS bundling. As React Native CLI does not support CSS bundling, **only Expo SDK 49+** is supported.

```tsx
const { getDefaultConfig } = require("expo/metro-config");
const { withNeapolitanExtract } = require("neapolitan-extract");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true, // Make sure you enable CSS!
});

module.exports = withNeapolitanExtract(config);
```
