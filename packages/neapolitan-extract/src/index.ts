import {
  ComposableIntermediateConfigT,
  CssToReactNativeRuntimeOptions,
  withCssInterop,
} from "react-native-css-interop/metro";

export function withNeapolitanExtract(
  metroConfig: ComposableIntermediateConfigT,
  cssToReactNativeRuntimeOptions: CssToReactNativeRuntimeOptions
) {
  metroConfig = withCssInterop(metroConfig, cssToReactNativeRuntimeOptions);

  // eslint-disable-next-line unicorn/prefer-module
  metroConfig.transformerPath = require.resolve(
    "neapolitan-extract/dist/transformer"
  );

  return metroConfig;
}
