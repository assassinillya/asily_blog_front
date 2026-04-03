const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  parallel: false,
  devServer: {
    proxy: 'http://localhost:8081'
  }
})
