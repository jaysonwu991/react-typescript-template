const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: isDev && 'auto',
        targets: '> 1%, last 2 versions, not ie <= 8, iOS >= 8, Firefox >= 20, Android > 4.4',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    isDev && '@babel/plugin-transform-runtime',
  ].filter(Boolean),
}
