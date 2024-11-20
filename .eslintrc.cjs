module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    plugins: ['react-refresh', 'react-hooks', 'prettier'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'comma-dangle': ['error', 'only-multiline'],
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        // indent: ['error', 4],
        'no-unused-vars': ['warn'],
        // 'no-console': ['warn'],
    },
    settings: {
        react: {
            version: 'detect', 
        },
    },
};
