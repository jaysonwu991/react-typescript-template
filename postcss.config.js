module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not ie <= 8',
        'Firefox >= 20',
        'iOS >= 8',
        'Android > 4.4',
      ],
    },
    // 'postcss-import': {},
    // 'postcss-preset-env': {},
    // 'postcss-pxtorem': {
    //   rootValue: 75,
    //   unitPrecision: 5,
    //   propWhiteList: [],
    //   propBlackList: [],
    //   exclude: false,
    //   selectorBlackList: [],
    //   ignoreIdentifier: false,
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0
    // },
    // cssnano: {}
  },
};
