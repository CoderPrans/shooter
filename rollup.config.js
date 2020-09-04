import {terser} from 'rollup-plugin-terser';

export default {
  input: 'js/game.js',
  output: {
    file: 'public/bundle.min.js',
    format: 'iife',
    plugins: [terser()],
  },
};
