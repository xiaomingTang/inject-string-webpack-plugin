import { Compiler, sources, WebpackPluginInstance } from "webpack"
import { ConcatSource } from "webpack-sources"

const PluginName = "InjectStringWebpackPlugin"

interface Options {
  /**
   * 一个正则, 用于对每个最终生成的文件的 "filename" 进行测试
   * 
   * 满足该正则的文件将会被添加上 prefix 和 suffix
   * 
   * 注意, 这里的 filename, 其实是最终生成文件相对于 webpack.Configuration.output.path 的相对路径
   */
  test?: RegExp;
  prefix?: string;
  suffix?: string;
  /**
   * 注入 prefix 和 suffix 前会被调用
   */
  beforeInject?: (assetName: string, asset: sources.Source) => void;
  /**
   * 注入 prefix 和 suffix 后会被调用
   */
  afterInject?: (assetName: string, asset: sources.Source) => void;
}

/**
 * 本插件在一些很奇怪的场合能用上
 * 比如说开发 ps 插件的时候, 用 webpack 将项目打包为 ES3, 并且需要在文件顶部添加一些垫片类的代码
 * 比如说用于 tampermonkey 时, 需要往文件顶部以注释的形式添加项目元信息描述
 */
export class InjectStringWebpackPlugin implements WebpackPluginInstance {
  config: Options;

  constructor(options: Options = {}) {
    this.config = options
  }

  apply(compiler: Compiler) {
    const {
      test, prefix, suffix, beforeInject, afterInject,
    } = this.config

    compiler.hooks.afterCompile.tapAsync(PluginName, async (compilation, callback) => {
      Object.entries(compilation.assets).forEach(([assetName, asset]) => {
        if (test && test.test(assetName)) {
          let injected = false
          let src = asset.source()
          if (typeof src === "string") {
            if (!!prefix) {
              src = prefix + src
              injected = true
            }
            if (!!suffix) {
              src = src + suffix
              injected = true
            }
            if (injected) {
              let newAsset = asset
              if (beforeInject) {
                beforeInject(assetName, newAsset)
              }
              // @ts-ignore
              newAsset = new ConcatSource(src)
              compilation.assets[assetName] = newAsset
              if (afterInject) {
                afterInject(assetName, newAsset)
              }
            }
          }
        }
      })

      callback()
    })
  }
}
