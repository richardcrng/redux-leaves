(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{179:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return b}));var n=r(1),a=r(10),o=(r(0),r(185)),i={id:"overview",title:"Overview",hide_title:!0},c={id:"intro/overview",title:"Overview",description:"# Overview",source:"@site/../docs/intro/README.md",permalink:"/docs/intro/overview",sidebar:"docs",next:{title:"Features",permalink:"/docs/intro/features"}},l=[{value:"Motivation",id:"motivation",children:[{value:"Why?",id:"why",children:[]},{value:"How?",id:"how",children:[]},{value:"What?",id:"what",children:[]},{value:"Bonus: <code>useReducer</code> usage",id:"bonus-usereducer-usage",children:[]}]}],u={rightToc:l};function b(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"overview"},"Overview"),Object(o.b)("p",null,"The guiding philosophy of Redux-Leaves is ",Object(o.b)("em",{parentName:"p"},'"write once, reduce anywhere"'),"."),Object(o.b)("p",null,"This page explains more about the motivation of Redux-Leaves and how its design philosophy is put into practice."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("strong",{parentName:"p"},"Just want to see some code? Check out the basic ",Object(o.b)("a",Object(n.a)({parentName:"strong"},{href:"/docs/examples/basic-example"}),"30 second demo"),"."))),Object(o.b)("h2",{id:"motivation"},"Motivation"),Object(o.b)("h3",{id:"why"},"Why?"),Object(o.b)("p",null,"Redux is useful, powerful and great!"),Object(o.b)("p",null,"But some developers complain about the boilerplate being ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://medium.com/@Charles_Stover/no-boilerplate-global-state-management-in-react-41e905944eb7"}),"tedious, cumbersome and convoluted"),"."),Object(o.b)("p",null,"Can we make it easier for developers to get the use, power and great developer experience from Redux?"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("strong",{parentName:"p"},"Redux-Leaves aims to make Redux easier to learn ",Object(o.b)("em",{parentName:"strong"},"and")," quicker to scale"),".")),Object(o.b)("h3",{id:"how"},"How?"),Object(o.b)("p",null,"Let's consider some of the developer complaints against Redux."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},'"Redux requires a ton of tedious code to do the most basic things"'),Object(o.b)("li",{parentName:"ul"},'"It often feels tedious to do trivial state changes"'),Object(o.b)("li",{parentName:"ul"},'"Redux has too much boilerplate, and I have to maintain all of it"'),Object(o.b)("li",{parentName:"ul"},'"New developers have a problem with flux architecture and functional concepts"'),Object(o.b)("li",{parentName:"ul"},'"Redux requires a ton of files to establish a new reducer"')),Object(o.b)("p",null,"Maybe that developer experience would be better if we could:"),Object(o.b)("blockquote",null,Object(o.b)("ol",{parentName:"blockquote"},Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Quickly set up")," Redux for basic state changes;"),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Intuitively create actions")," for arbitrary needs; and"),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Cut down boilerplate")," of reducers drastically?"))),Object(o.b)("h3",{id:"what"},"What?"),Object(o.b)("p",null,"Redux-Leaves lets you ",Object(o.b)("em",{parentName:"p"},"write once, reduce anywhere")," with:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/intro/features#quick-setup"}),"Quick setup"),";"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/intro/features#intuitive-api"}),"Intuitive API"),"; and"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/intro/features#minimal-boilerplate"}),"Minimal boilerplate"),".")),Object(o.b)("h3",{id:"bonus-usereducer-usage"},"Bonus: ",Object(o.b)("inlineCode",{parentName:"h3"},"useReducer")," usage"),Object(o.b)("p",null,"Although Redux-Leaves was written to make it easier to work with Redux, ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/examples/usereducer-example"}),"it also works great with ",Object(o.b)("inlineCode",{parentName:"a"},"useReducer")),"!"))}b.isMDXComponent=!0},185:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=a.a.createContext({}),b=function(e){var t=a.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},s=function(e){var t=b(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=b(r),d=n,m=s["".concat(i,".").concat(d)]||s[d]||p[d]||o;return r?a.a.createElement(m,c({ref:t},u,{components:r})):a.a.createElement(m,c({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var u=2;u<o;u++)i[u]=r[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);