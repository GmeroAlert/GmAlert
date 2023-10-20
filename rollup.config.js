import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import postcssPresetEnv from 'postcss-preset-env'

import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'docs/index.js',
      format: 'iife',
      name: 'GmAlert',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      replace({
        __VERSION__: JSON.stringify(pkg.version),
        preventAssignment: true,
      }),
      postcss({
        modules: {
          generateScopedName: '[local]___[hash:base64:5]',
        },
        plugins: [postcssPresetEnv()],
        // extract: 'css/index.css',
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'mode_modules/**',
      }),
      serve({
        contentBase: ['docs', 'lib'],
      }),
    ],
  },
]
