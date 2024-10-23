module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier", "./.eslintrc-auto-import.json"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  parser: "vue-eslint-parser",
  plugins: ["vue", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true
      }
    ],
    "vue/multi-word-component-names": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "object-curly-newline": 0,
    "max-len": [
      "error",
      {
        code: 160
      }
    ],
    "implicit-arrow-linebreak": 0,
    "no-else-return": [
      0,
      {
        allowElseIf: true
      }
    ],
    "no-param-reassign": [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: [
          "res", // for Express responses
          "item", // for Express responses
          "state" // for vuex state 解决assignment to property of function parameter ‘state‘
        ]
      }
    ],
    "no-plusplus": 0,
    "no-return-assign": 0,
    "no-unused-expressions": 0
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
      }
    }
  }
};
