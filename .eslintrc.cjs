module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    parser: '@babel/eslint-parser', 
    parserOptions: {
        requireConfigFile: false, 
        ecmaVersion: 2020,
        sourceType: 'module', 
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    plugins: ['prettier'],
    rules: {
        'comma-dangle': ['error', 'only-multiline'],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
         "react/prop-types": "off",
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
