import { fixupConfigRules } from '@eslint/compat';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';

const fsdBoundariesConfig = [
  {
    ignores: ['node_modules/**', 'dist/**', '.next/**'],
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      boundaries,
      import: importPlugin,
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'views', pattern: 'src/views/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
      'boundaries/include': ['src/**/*.*'],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      ...boundaries.configs.strict.rules,
      'boundaries/no-ignored': [0],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${file.type} is not allowed to import ${dependency.type}',
          rules: [
            {
              from: 'app',
              allow: ['app', 'views', 'widgets', 'features', 'entities', 'shared'],
            },
              { from: 'views', allow: ['views', 'widgets', 'features', 'entities', 'shared'] },
              { from: 'widgets', allow: ['widgets', 'features', 'entities', 'shared'] },
              { from: 'features', allow: ['features', 'entities', 'shared'] },
              { from: 'entities', allow: ['entities', 'shared'] },
              { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default fixupConfigRules(fsdBoundariesConfig);
