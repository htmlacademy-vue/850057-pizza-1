module.exports = {
  publicPath: "",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/ds-system/ds.scss";
          @import "@/assets/scss/mixins/mixins.scss";
        `,
      },
    },
  },

  devServer: {
    proxy: {
      "^/api": {
        target: "http://backend:3000/",
        changeOrigin: false,
        pathRewrite: { "^/api/": "/" },
      },
      "^/public": {
        target: "http://backend:3000/",
        changeOrigin: false,
        pathRewrite: { "^/public/": "/public/" },
      },
      "/explorer": {
        target: "http://backend:3000/",
        changeOrigin: false,
        proxyTimeout: 1000 * 60 * 10,
        pathRewrite: { "/docs/explorer": "/explorer" },
      },
    },

    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "svgo-loader",
        },
      ],
    },
  },
};
