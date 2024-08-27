import serve from 'rollup-plugin-serve'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import style from 'rollup-plugin-style-import'

// 引入package.json
import pkg from './package.json' assert { type: 'json' }

// iife umd 等格式需要name来作为浏览器windows下的函数名
const funcName = 'Gmal'

const bundles = [
  {
    input: './src/demo/index.ts',
    output: {
      file: `./docs/index.js`,
      format: 'iife',
      name: funcName,
      sourcemap: false,
    },
  },
]

export default bundles.map(({ input, output }) => ({
  input,
  output,
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'mode_modules/**',
    }),
    style(),
    !process.env.needbuild &&
      serve({
        open: false,
        contentBase: ['docs'],
        port: 3010,
      }),
  ],
}))
