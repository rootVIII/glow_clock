module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
        'no-plusplus': 'off',
        'func-names': ['error', 'never'],
        'no-multiple-empty-lines': 'error',
        'space-before-function-paren': ['error', 'never'],
        'prefer-const': 0,
        'no-console': 'off',
        'import/prefer-default-export': 'off',
        'no-var': 0,
        'no-useless-escape': 0,
    },
};
