const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  configureWebpack: {
    // 配置 Webpack 插件
    plugins: [
    ]
  },
  devServer: { 
    // disableHostCheck: true 
    allowedHosts: "all",
  }
}