const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  lintOnSave:false,
  configureWebpack: {
    // 配置 Webpack 插件
    plugins: [
    ]
  }
}