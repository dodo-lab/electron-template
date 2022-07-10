function path(p) {
  return [p, p.replace(/\//g, '\\')];
}

module.exports = {
  extends: 'erb',
  plugins: ['strict-dependencies'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'import/order': 'warn',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'off',
    'strict-dependencies/strict-dependencies': [
      'error',
      [
        {
          module: 'main',
          allowReferenceFrom: [],
          allowSameModule: true,
        },
        {
          module: 'renderer',
          allowReferenceFrom: [],
          allowSameModule: true,
        },
        {
          module: 'electron',
          allowReferenceFrom: [...path('src/main')],
          allowSameModule: true,
        },
        {
          module: 'electron-store',
          allowReferenceFrom: [...path('src/main/config')],
          allowSameModule: true,
        },
      ],
      {
        resolveRelativeImport: true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
