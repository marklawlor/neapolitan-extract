import {
  compile,
  getSourceFromVirtualCssFile,
  processVanillaFile,
} from "@vanilla-extract/integration";
import type {
  JsTransformerConfig,
  JsTransformOptions,
} from "metro-transform-worker";
import { CssToReactNativeRuntimeOptions } from "react-native-css-interop/metro";

export interface CssInteropJsTransformerConfig extends JsTransformerConfig {
  transformerPath?: string;
  cssToReactNativeRuntime?: CssToReactNativeRuntimeOptions;
}

export async function transformWebCSS(
  transformer: any,
  config: CssInteropJsTransformerConfig,
  rootDir: string,
  filename: string,
  _data: Buffer,
  options: JsTransformOptions
) {
  const identOption = options.dev ? "debug" : "short";

  const { source } = await compile({
    filePath: filename,
    cwd: rootDir,
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

  const {
    output: [{ data: transformedCSS }],
  } = await transformer(
    config,
    rootDir,
    cssFile.fileName,
    Buffer.from(cssFile.source),
    options
  );

  // Remove the first line of the wrapper `_d(function (...){\n <code we want> \n}`
  const unwrappedCSSCode = transformedCSS.code
    .split("\n")
    .slice(1, -1)
    .join("\n");

  const transformerResponse = await transformer(
    config,
    rootDir,
    filename,
    Buffer.from(`${linesOfCode.join("\n")};${unwrappedCSSCode}`),
    options
  );

  transformerResponse.output[0].data.css = transformedCSS.css;

  return transformerResponse;
}
