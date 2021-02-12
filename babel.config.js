module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        target: '> 1%, last 2 versions, not ie <= 8, iOS >= 8, Firefox >= 20,Android > 4.4'
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ]
}
