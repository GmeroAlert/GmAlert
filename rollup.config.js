import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import inline from 'rollup-plugin-inline-import'
import replace from '@rollup/plugin-replace'

// 引入package.json
import pkg from './package.json' assert { type: 'json' }

// 拿到package.json的name属性来动态设置打包名称
const libName = pkg.name
// iife umd 等格式需要name来作为浏览器windows下的函数名
const funcName = 'Gmal'

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
  },
]

const flieName = (path) => {
  return path.split('/').pop().replace('.js', '')
}

export default bundles.map(({ input, output }) => ({
  input,
  output,
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    replace({
      preventAssignment: true,
      __VERSION__: JSON.stringify(pkg.version),
      __IS_CLIENT__: output.file.includes('.min.')? 'true': 'false',
    }),
    inline(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'mode_modules/**',
    }),
    output.file.includes('.min.') && terser(),
  ],
}))
