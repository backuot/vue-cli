module.exports = {
  chainWebpack: (config) => {
    const imgRule = config.module.rule('images');
    imgRule.use('file-loader')
      .loader('image-webpack-loader')
      .tap((options) => {
        const ret = options || {};
        ret.optipng = {
          enabled: false,
        };

        ret.pngquant = {
          quality: [0.65, 0.90],
          speed: 4,
        };

        ret.mozjpeg = {
          progressive: true,
        };

        ret.gifsicle = {
          interlaced: false,
        };

        ret.svgo = {
          plugins: [
            {
              removeViewBox: false,
            },
            {
              removeEmptyAttrs: false,
            },
          ],
        };

        return ret;
      });
  },
};
