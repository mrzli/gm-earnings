module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "tsconfig.json"
  },
  plugins: ["prettier"],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended",
    "prettier/react"
    // "eslint:all",
    // "plugin:@typescript-eslint/all",
    // "plugin:react/all"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "jest/valid-title": "off"
  }
  // rules: {
  //   // eslint - best practices
  //   "no-else-return": "off",
  //   // eslint - variables
  //   "no-undefined": "off",
  //   // eslint - best practices
  //   "require-unicode-regexp": "off",
  //   // eslint - stylistic issues
  //   "array-element-newline": "off",
  //   "capitalized-comments": "off",
  //   "func-style": ["error", "declaration"],
  //   "function-call-argument-newline": ["error", "consistent"],
  //   "function-paren-newline": ["error", "consistent"],
  //   "indent": ["error", 2],
  //   "max-lines-per-function": ["error", 100],
  //   "max-params": ["error", 8],
  //   "multiline-comment-style": "off",
  //   "object-curly-spacing": ["error", "always"],
  //   "object-property-newline": [
  //     "error",
  //     {
  //       "allowAllPropertiesOnSameLine": true
  //     }
  //   ],
  //   "one-var": ["error", "never"],
  //   "padded-blocks": "off",
  //   "quote-props": ["error", "as-needed"],
  //   "quotes": ["error", "single"],
  //   "space-before-function-paren": [
  //     "error",
  //     {
  //       "anonymous": "always",
  //       "named": "never",
  //       "asyncArrow": "always"
  //     }
  //   ],
  //   // eslint - es6
  //   "sort-imports": "off",
  //   "sort-keys": "off",
  //
  //   // @typescript-eslint
  //   "@typescript-eslint/consistent-type-imports": "off",
  //   "@typescript-eslint/indent": ["error", 2],
  //   "@typescript-eslint/naming-convention": [
  //     "error",
  //     {
  //       "selector": "function",
  //       "format": ["StrictPascalCase", "strictCamelCase"]
  //     }
  //   ],
  //   "@typescript-eslint/no-empty-interface": "warn",
  //   "@typescript-eslint/no-extra-parens": "off",
  //   "@typescript-eslint/no-magic-numbers": [
  //     "error",
  //     {
  //       "ignore": [-1, 0, 1]
  //     }
  //     ],
  //   "@typescript-eslint/no-type-alias": "off",
  //   "@typescript-eslint/prefer-readonly-parameter-types": "off",
  //   "@typescript-eslint/quotes": [
  //     "error",
  //     "single",
  //     {
  //       "avoidEscape": true
  //     }
  //   ],
  //   "@typescript-eslint/space-before-function-paren": [
  //     "error",
  //     {
  //       "anonymous": "always",
  //       "named": "never",
  //       "asyncArrow": "always"
  //     }
  //   ],
  //
  //   // react
  //   "react/destructuring-assignment": ["error", "never"],
  //   "react/forbid-component-props": "off",
  //   "react/jsx-boolean-value": ["error", "always"],
  //   "react/jsx-curly-brace-presence": [
  //     "error",
  //     {
  //       "props": "always",
  //       "children": "always"
  //     }
  //   ],
  //   "react/jsx-filename-extension": [
  //     "error",
  //     {
  //       "allow": "always",
  //       "extensions": [".tsx"]
  //     }
  //   ],
  //   "react/jsx-indent": ["error", 2],
  //   "react/jsx-indent-props": "off",
  //   "react/jsx-max-depth": ["error", {"max": 8}],
  //   "react/jsx-max-props-per-line": [
  //     "error",
  //     {
  //       "when": "multiline"
  //     }
  //   ],
  //   "react/jsx-one-expression-per-line": [
  //     "error",
  //     {
  //       "allow": "single-child"
  //     }
  //   ],
  //   "react/jsx-sort-props": "off",
  //
  //   // jest
  //   "jest/valid-title": ["warn", {"ignoreTypeOfDescribeName": true}]
  // },
  // overrides: [
  //   {
  //     "files": ["**/*.{ts,tsx}"],
  //     "rules": {
  //       "indent": "off",
  //       "no-unused-vars": "off",
  //       "no-use-before-define": "off",
  //       "quotes": "off",
  //       "space-before-function-paren": "off",
  //     }
  //   },
  //   {
  //     "files": ["**/*.test.{ts,tsx}"],
  //     "rules": {
  //       "max-lines-per-function": "off",
  //       "@typescript-eslint/no-magic-numbers": "off"
  //     }
  //   }
  // ]
};
