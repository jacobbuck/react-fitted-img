import babel from 'rollup-plugin-babel';

export default {
  input: 'src/FittedImg.js',
  output: {
    file: 'lib/FittedImg.js',
    format: 'cjs',
  },
  external: ['prop-types', 'react'],
  plugins: [babel()],
};
