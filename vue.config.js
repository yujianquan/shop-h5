const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    chainWebpack: (config) => {
        config.module
      .rule("scss")
      .oneOf("vue")
      .use("px2rem-loader")
      .loader("px2rem-loader")
      .before("postcss-loader") // this makes it work.
      .options({ remUnit: 36, remPrecision: 8 })

        config.module
      .rule("base64img")
      .test(/src\/assets\/img\/pdf\/(.*)\.+(png|jpe?g|gif)$/i)
      .use("url-loader")
      .loader("url-loader")
      .options({
          limit: 102400,
          fallback: { loader: "file-loader" }
      })
    }
})
