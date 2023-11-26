import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import postcssPresetEnv from 'postcss-preset-env'
import styles from '@ironkinoko/rollup-plugin-styles'

// 引入package.json
import pkg from './package.json' assert { type: 'json' }

// 拿到package.json的name属性来动态设置打包名称
const libName = pkg.name
// iife umd 等格式需要name来作为浏览器windows下的函数名
const funcName = 'Gmal'
// css的前缀
const cssPre = 'Gmal'

const bundles = [
  {
    input: './src/index.ts',
    output: {
      file: `./dist/${libName}.min.js`,
      format: 'iife',
      name: funcName,
      sourcemap: false,
    },
  },
  {
    input: './src/main.ts',
    output: {
      file: `./dist/${libName}.esm.js`,
      format: 'esm',
    },
  }
]

export default bundles.map(({ input, output }) => ({
  input,
  output,
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    styles({
      mode: ["inject", {treeshakeable: output.format === 'esm'}],
      autoModules: true,
      modules: {
        generateScopedName: `${cssPre}_[hash:4]`,
      },
      plugins: [postcssPresetEnv()],
      minimize: true
      // extract: `${libName}.min.css`, // 如果你想导出css而不是css in js
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'mode_modules/**',
      plugins: ['annotate-pure-calls']
    }),
    output.file.includes('.min.') && terser(),
  ]
}))
