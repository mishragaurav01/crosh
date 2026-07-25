import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    eslintConfigPrettier,
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**']
    },
    {
        files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.mjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/consistent-type-imports': 'error',
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
        }
    }
);
