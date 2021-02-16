module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          browsers: [
            '> 1%',
            'last 2 versions',
            'not ie <= 8',
            'iOS >= 8',
            'Firefox >= 20',
            'Android > 4.4'
          ]
        }
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
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
