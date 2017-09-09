/**
 * Created by Yinxiong on 2016/11/20.
 */

import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  name: 'main',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
