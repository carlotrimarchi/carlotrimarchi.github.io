import postcssImportExtGlob from "postcss-import-ext-glob";
import postcssImport from "postcss-import";
import autoPrefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
  plugins: [postcssImportExtGlob, autoPrefixer, postcssImport, cssnano],
};
