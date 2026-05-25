import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescript from 'typescript-eslint';

export default [
    {
        ignores: [
            'vendor',
            'node_modules',
            'front',
            'public',
            'bootstrap/cache',
            'storage',
            'resources/js/components/components/ui',
        ],
    },
    js.configs.recommended,
    reactHooks.configs.flat.recommended,
    ...typescript.configs.recommended,
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat['jsx-runtime'],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    prettier,
];
