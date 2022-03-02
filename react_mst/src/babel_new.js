const  babel = require('@babel/core') ;

const sourceCode = '<h1>hellow<span>world</span></h1>';

const result = babel.transformSync(sourceCode, {
  plugins: ["@babel/plugin-transform-react-jsx", {
    // "throwIfNamespace": false, // defaults to true
    "runtime": "automatic", // defaults to classic
    // "importSource": "custom-jsx-library" // defaults to react
  }]
 
});
console.log(result);

// Automatic 不需要引入react
// import { jsx as _jsx } from "react/jsx-runtime";
// import { jsxs as _jsxs } from "react/jsx-runtime";

// const profile = _jsxs("div", {
//   children: [
//     _jsx("img", {
//       src: "avatar.png",
//       className: "profile",
//     }),
//     _jsx("h3", {
//       children: [user.firstName, user.lastName].join(" "),
//     }),
//   ],
// });

// classic 老的，需要引入react
// const profile = React.createElement(
//   "div",
//   null,
//   React.createElement("img", { src: "avatar.png", className: "profile" }),
//   React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
// );
