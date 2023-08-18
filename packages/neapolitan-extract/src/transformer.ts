import { CssToReactNativeRuntimeOptions } from "react-native-css-interop/metro";
import worker, {
  JsTransformerConfig,
  JsTransformOptions,
  TransformResponse,
} from "metro-transform-worker";
import { cssFileFilter } from "@vanilla-extract/integration";
import { transformWebCSS } from "./web";
import { transformNativeCSS } from "./native";

export interface CssInteropJsTransformerConfig extends JsTransformerConfig {
  transformerPath?: string;
  cssToReactNativeRuntime?: CssToReactNativeRuntimeOptions;
}

export async function transform(
  config: CssInteropJsTransformerConfig,
  rootDir: string,
  filename: string,
  data: Buffer,
  options: JsTransformOptions
): Promise<TransformResponse> {
  const transformer = config.transformerPath
    ? require(config.transformerPath).transform
    : worker.transform;

  if (cssFileFilter.test(filename)) {
    if (options.platform === "web") {
      return transformWebCSS(
        transformer,
        config,
        rootDir,
        filename,
        data,
        options
      );
    } else {
      return transformNativeCSS(
        transformer,
        config,
        rootDir,
        filename,
        data,
        options
      );
    }
  }

  return transformer(config, rootDir, filename, data, options);
}
