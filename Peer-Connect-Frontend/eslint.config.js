import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {files: ["src/**/*{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginReact.configs.flat.recommended,
];