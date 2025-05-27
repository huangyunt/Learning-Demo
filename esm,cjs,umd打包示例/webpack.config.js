const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 公共配置
const commonConfig = {
    mode: 'production',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // use: {
                //   loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env']
                //   }
                // }
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin() // 清理dist目录
    ],
    resolve: {
        extensions: ['.js']
    }
};

// ESM 配置
const esmConfig = {
    ...commonConfig,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'string-utils.esm.js',
        library: {
            type: 'module' // 输出ESM格式
        }
    },
    experiments: {
        outputModule: true // 启用ESM输出
    },
    optimization: {
        minimize: false // 开发环境不压缩
    }
};

// CJS 配置
const cjsConfig = {
    ...commonConfig,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'string-utils.cjs.js',
        library: {
            type: 'commonjs2' // 输出CJS格式
        }
    },
    target: 'node', // 针对Node.js环境
    optimization: {
        minimize: false
    }
};

// UMD 配置（开发环境）
const umdDevConfig = {
    ...commonConfig,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'string-utils.umd.js',
        library: {
            name: 'StringUtils', // 全局变量名
            type: 'umd' // 输出UMD格式
        },
        globalObject: 'this' // 兼容浏览器和Node.js
    },
    optimization: {
        minimize: false
    }
};

// UMD 配置（生产环境，压缩版）
const umdProdConfig = {
    ...umdDevConfig,
    output: {
        filename: 'string-utils.umd.min.js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    }
};

module.exports = [esmConfig, cjsConfig, umdDevConfig, umdProdConfig];