### Period-1 Vanilla JavaScript, es2015/15.., Node.js, Babel + Webpack and TypeScript

**Explain the differences between Java and JavaScript. You should include both topics related to the fact that Java is a compiled language and JavaScript a scripted language, and general differences in language features.**

Java and JavaScript are both general purpose programming languages.
* Java is mostly used to create backend applications, but can also be used to create desktop applications.
* JavaScript is mostly used to create frontend web applications, but are now also used to create backend applications 
using `node.js`.
* Java is a compiled language. Java code is compiled to java-bytecode, that can then be run on Java Virtual Machines.
* JavaScript is mostly an interpreted language. JavaScript code is directly interpreted by some JavaScript runtime. In the 
browser, the JavaScript code is run by the browser's JavaScript engine. Other runtimes include the popular `node.js` engine. 
Even though JavaScript is interpreted, it has become more commonplace to transpile versions of JavaScript.
* Java has a static type-system, where the types of values are known at compile-time.
* JavaScript has a dynamic type-system, where the types of values are not necessarily known at compile-time. 
* Java has strong typing, meaning that implicit type coercion is not done.
* JavaScript has weak typing, meaning that JavaScript engines will attempt to convert values of one type to values of 
other types.

**Explain the two strategies for improving JavaScript: ES6 (es2015) + ES7, versus Typescript. What does it require to use 
these technologies: In our backend with Node and in (many different) Browsers.**

 ECMAScript is a scripting-language specification standardized by Ecma International in ECMA-262 and ISO/IEC 16262. It 
 was created to standardize JavaScript, so as to foster multiple independent implementations. JavaScript has remained 
 the best-known implementation of ECMAScript since the standard was first published ECMAScript is commonly used for 
 client-side scripting on the World Wide Web, and it is increasingly being used for writing server applications and services using Node.js.

 ECMAScript standards introduce new features into JavaScript.
  
 TypeScript aims to introduce static type-checking to ECMAScript. TypeScript code can then be transpiled into different 
 ECMAScript targets. The runtime of the target ECMAScript is not changed. The next ECMAScript features are also included
 in the TypeScript compiler.
 
 **Explain generally about node.js, when it “makes sense” and npm, and how it “fits” into the node eco-system.**
 
 ``node.js`` is a JavaScript runtime environment, that can run JavaScript code. We use `node.js` to run JavaScript code 
 outside a web-browser. There may be some alternative to `node.js`. 
 
 `npm` is a package manager. It manages libraries included into node projects. It allows for easy dependency management. 
 ``npm`` is also a library repository that contains many JavaScript libraries.
 
**Explain about the Event Loop in Node.js**
 
 The event loop is a mechanism to stimulate multi-threaded code execution is a single-threaded environment (`node.js`). 
 The task queue is a queue of asynchronous operations waiting to be executed. When the main stack is empty, the event loop can 
 then execute the next operation on the task queue. 
 
 - https://www.youtube.com/watch?v=8aGhZQkoFbQ
 - https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/
 
**Explain of the purposes of the tools Babel and WebPack, using  examples from the exercises**
 
Babel or Babel.js is a free and open-source JavaScript compiler and configurable transpiler used in web 
development. Babel allows software developers to write source code in a preferred programming language 
or markup language and have it translated by Babel into JavaScript, a language understood by modern web 
browsers.

WebPack
