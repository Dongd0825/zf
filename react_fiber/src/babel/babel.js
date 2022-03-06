const  babel = require('@babel/core') ;

const sourceCode = '<h1>hellow<span>world</span></h1>';

const result = babel.transformSync(sourceCode, {
  plugins: ["@babel/plugin-transform-react-jsx"]
  // plugins: ['@babel/plugin-transform-react-jsx', {
  //   runtime: 'classic'
  // }]
});
console.log(result);
