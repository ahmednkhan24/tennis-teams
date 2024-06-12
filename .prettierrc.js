module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  printWidth: 80,
  importOrder: [
    'react',
    'react-router-dom',
    '^[a-zA-Z]',
    '^[^./]',
    '^..',
    '^[.]$',
  ],
  importOrderSortSpecifiers: true,
};
