import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { 
    languageOptions: { 
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        // Browser globals
        document: true,
        window: true,
        navigator: true,
        location: true,
        localStorage: true,
        sessionStorage: true,
        
        // Node.js globals
        console: true,
        process: true,
        
        // Testing globals
        test: true,
        expect: true,
        describe: true,
        it: true,
        beforeEach: true,
        afterEach: true,
        jest: true
      }
    },
    rules: {
      // Variable and function rules
      'no-unused-vars': ['error', { 
        varsIgnorePattern: 'React|App',
        argsIgnorePattern: '^_'
      }],
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-shadow': 'warn',
      
      // Code quality rules
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-console': 'warn',
      'no-debugger': 'warn',
      
      // Best practices
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      
      // Modern JavaScript
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn'
    }
  },
  pluginJs.configs.recommended,
  {
    plugins: { react: pluginReact },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // React-specific rules
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "warn",
      "react/no-unused-state": "warn",
      "react/no-direct-mutation-state": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-danger": "warn",
      "react/no-deprecated": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-closing-bracket-location": "warn",
      "react/jsx-closing-tag-location": "warn",
      "react/jsx-curly-spacing": ["warn", "never"],
      "react/jsx-equals-spacing": ["warn", "never"],
      "react/jsx-props-no-multi-spaces": "warn"
    }
  }
]
