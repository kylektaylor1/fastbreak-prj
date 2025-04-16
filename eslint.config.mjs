import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginQuery from '@tanstack/eslint-plugin-query';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
    { files: ['./src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        files: ['./src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        files: ['./src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    ...pluginQuery.configs['flat/recommended'],
    reactHooks.configs['recommended-latest'],
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],
        },
    },
]);
