# inject-string-webpack-plugin

## descriptions
本插件用于往最终生成的 assets 文件中添加前/后缀, 一般用不上, 但是在一些很奇怪的场合能用上

比如说开发 ps 插件的时候, 用 webpack 将项目打包为 ES3, 并且需要在文件顶部添加一些垫片类的代码

比如说开发 tampermonkey 时, 需要往文件顶部以注释的形式添加项目元信息描述

## install
```
yarn add -D inject-string-webpack-plugin
```

## usage
``` javascript
// webpack.config.js
const InjectStringWebpackPlugin = require("inject-string-webpack-plugin")

module.exports = {
  // ...
  plugins: [
    new InjectStringWebpackPlugin({
      /**
       * 一个正则, 用于对每个最终生成的文件的 "filename" 进行测试
       * 
       * 满足该正则的文件将会被添加上 prefix 和 suffix
       * 
       * 注意, 这里的 filename, 其实是最终生成文件相对于 webpack.Configuration.output.path 的相对路径
       */
      test: /static[/\\]scripts[/\\]index\..*js/g,

      prefix: `
        // prefix here
      `,
      
      suffix: `
        // suffix here
      `,
      
      beforeInject: (assetName, asset) => {
        // called before inject
      },
      
      afterInject: (assetName, asset) => {
        // called after inject
      },
    })
  ]
}
```

## warning
只会往文本文件中注入, 其他二进制文件(如图片等)将会跳过
