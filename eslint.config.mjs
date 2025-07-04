import importAlias from '@dword-design/eslint-plugin-import-alias';
import eslintReact from '@eslint-react/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import * as importX from 'eslint-plugin-import-x';
import prettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactHooks.configs['recommended-latest'],
  importAlias.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  reactCompiler.configs.recommended,
  {
    ignores: [
      'dist/*',
      'eslint.config.mjs',
      'android/*',
      'ios/*',
      'expo-env.d.ts',
      'src/db/drizzle/*',
      'babel.config.js',
      'scripts/*.js',
      'src/types/strapi/*',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'warn',
      'import-x/no-named-as-default': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-unused-vars': 'off',
      'no-nested-ternary': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'no-console': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'import-x/order': [
        'error',
        {
          pathGroups: [
            {
              // Minimatch pattern used to match against specifiers
              pattern: '@/**',
              // The predefined group this PathGroup is defined in relation to
              group: 'external',
              // How matching imports will be positioned relative to "group"
              position: 'after',
            },
          ],
          groups: [
            // Imports of builtins are first
            'builtin',
            'external',
            // Then index file imports
            'index',
            // Then any arcane TypeScript imports
            'object',
            // Then sibling and parent imports. They can be mingled together
            ['sibling', 'parent'],
            // Then the omitted imports: internal, type, unknown
          ],
          'newlines-between': 'always',
        },
      ],
      'no-else-return': ['error', { allowElseIf: false }],
      '@eslint-react/no-leaked-conditional-rendering': 'error',
      'react-compiler/react-compiler': 'error',
    },
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
    },
  },
  {
    rules: {
      '@dword-design/import-alias/prefer-alias': [
        'error',
        {
          alias: {
            '@': './src',
          },
          aliasForSubpaths: true,
        },
      ],
    },
  },
  prettier,
]);
