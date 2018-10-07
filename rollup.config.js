import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  external: ['react', 'react-dom'],

  output: [
    {
      format: 'umd',
      name: 'ReactRouting',
      file: './dist/index.js',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    {
      format: 'es',
      name: 'ReactRouting',
      file: './dist/index.module.js',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
  ],

  plugins: [
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve(),
    commonjs()
  ]
}
