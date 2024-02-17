import serve from 'rollup-plugin-serve'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import postcssPresetEnv from 'postcss-preset-env'
import postcss from 'rollup-plugin-postcss'

// 引入package.json
import pkg from './package.json' assert { type: 'json' }

// iife umd 等格式需要name来作为浏览器windows下的函数名
const funcName = 'Gmal'

const bundles = [
  {
    input: './src/test/index.ts',
    output: {
      file: `./test/index.js`,
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
    postcss({
      plugins: [
        postcssPresetEnv({
          features: {
            'custom-properties': false,
          },
        }),
      ],
      extract: `index.css`, // 如果你想导出css而不是css in js
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'mode_modules/**',
      plugins: ['annotate-pure-calls'],
    }),
    terser(),
    !process.env.needbuild &&
      serve({
        open: false,
        contentBase: ['test'],
        port: 3010,
      }),
  ],
}))
