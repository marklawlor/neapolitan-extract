import {
  compile,
  getSourceFromVirtualCssFile,
  processVanillaFile,
} from "@vanilla-extract/integration";
import type {
  JsTransformerConfig,
  JsTransformOptions,
} from "metro-transform-worker";
import { cssToReactNativeRuntime } from "react-native-css-interop/dist/css-to-rn";
import { CssToReactNativeRuntimeOptions } from "react-native-css-interop/metro";

export interface CssInteropJsTransformerConfig extends JsTransformerConfig {
  transformerPath?: string;
  cssToReactNativeRuntime?: CssToReactNativeRuntimeOptions;
}

export async function transformNativeCSS(
  transformer: any,
  config: CssInteropJsTransformerConfig,
  projectRoot: string,
  filename: string,
  _data: Buffer,
  options: JsTransformOptions
) {
  const identOption = options.dev ? "debug" : "short";

  const { source } = await compile({
    filePath: filename,
    cwd: projectRoot,
    esbuildOptions: undefined,
    identOption,
  });

  const vanillaFile = await processVanillaFile({
    source,
    filePath: filename,
    identOption,
  });

  const [virtualCSSImport, ...linesOfCode] = vanillaFile.split("\n");

  const cssFile = await getSourceFromVirtualCssFile(
    // Strip the `import()` syntax
    virtualCSSImport.replace("import '", "").replace("';", "")
  );

  const runtimeData = JSON.stringify(
    cssToReactNativeRuntime(cssFile.source, config.cssToReactNativeRuntime)
  );

  const code =
    linesOfCode.join("\n") +
    `require("react-native-css-interop").StyleSheet.register(${runtimeData});`;

  return transformer(config, projectRoot, filename, Buffer.from(code), options);
}
