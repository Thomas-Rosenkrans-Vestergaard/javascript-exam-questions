# Period-1 Vanilla JavaScript, es2015/15.., Node.js, Babel + Webpack and TypeScript

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

- https://medium.com/ag-grid/webpack-tutorial-understanding-how-it-works-f73dfa164f01
- https://survivejs.com/webpack/what-is-webpack/
- https://webpack.js.org/concepts/


Webpack is a module bundler. It takes disparate dependencies, creates modules for them and bundles the entire network up into manageable output files. This is especially useful for Single Page Applications (SPAs), which is the defacto standard for Web Applications today.

At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

When you bundle a project using webpack, it traverses the imports, constructing a dependency graph of the project and then generates output based on the configuration.

**Explain the purpose of “use strict” and Linters, exemplified with ESLint**

JavaScript's strict mode, introduced in ECMAScript 5, is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode". Strict mode isn't just a subset: it intentionally has different semantics from normal code. Browsers not supporting strict mode will run strict mode code with different behavior from browsers that do, so don't rely on strict mode without feature-testing for support for the relevant aspects of strict mode. Strict mode code and non-strict mode code can coexist, so scripts can opt into strict mode incrementally.

Strict mode can be applied to scripts, by using the below declaration.
```js
'use strict';
```

Strict mode can also be applied to individual functions.

````js

function strict() {

  'use strict';
  function alsoStrict(){}
}

function notStrict() {}
````

Strict mode applies to entire scripts or to individual functions. It doesn't apply to block statements enclosed in {} braces; attempting to apply it to such contexts does nothing.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
- https://medium.com/@danielsternlicht/thoughts-about-javascript-linters-and-lint-driven-development-7c8f17e7e1a0

A linter is a parser that parses your code and looks for mistakes. A linter could help you develop faster, keep your code organized, and do less syntax mistakes that potentially could cause errors and break your code.

In JS, using a linter will parse your code on-the-fly, and will let you know if your code is valid and written correctly. In addition, a JS linter could warn you about misusing your team’s code style.

Given the fact that every developer has its own style in code writing, working with linter that warns you about rules your team has defined in your code style guide, could help your team keep the code maintainable and readable for all — present and future developers.

- https://eslint.org/docs/rules/

### Explain using sufficient code examples the following features in JavaScript. 

#### Variable/function-Hoisting

- https://www.w3schools.com/js/js_hoisting.asp
- https://developer.mozilla.org/en-US/docs/Glossary/Hoisting

Variable and function hoisting refers to a behavior of JavaScript when declaring functions and variables. Hoisting means 
that variables and functions can be used and called before they are explicitly declared.

````js
f(); // works 
function f() {
    
}
````

The same behavior occurs when declaring variables using the `var` keyword. Note that while the declaration of the variable is moved to the top of the function scope, the assignment is not.

````js
console.log(x); // undefined
var x = 5
console.log(x); // 5
````

The above example runs without errors, unless `strict` mode is active.

Variables and constants declared with `let` or `const` are not hoisted. These two keywords provide Block Scope variables (and constants) in JavaScript.

```js
{
    var a = 1;
    let b = 1;
}

console.log(a); // can be accessed
console.log(b); // cannot be accessed
```

In the above example `b` cannot be accessed since `let` and `const` are block scoped, meaning that they cannot be accessed outside the scope wherein they were declared.

#### `this` in JavaScript and how it differs from what we know from Java/.net.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

A function's `this` keyword behaves a little differently in JavaScript compared to other languages. It also has some differences between strict mode and non-strict mode.

In most cases, the value of `this` is determined by how a function is called. It can't be set by assignment during execution, and it may be different each time the function is called. ES5 introduced the `bind` method to set the value of a function's this regardless of how it's called, and ES2015 introduced arrow functions which don't provide their own this binding (it retains the this value of the enclosing lexical context).

In the global execution context (outside of any function), `this` refers to the global object whether in strict mode or not.

```js
// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b); // "MDN"
console.log(b);        // "MDN"
```

Inside a function, the value of `this` depends on how the function is called.
- In non-`strict` mode, `this` will default to the global object, which is window in a browser.
- In `strict` mode, however, the value of this remains at whatever it was set to when entering the execution context, so, in the following case, this will default to undefined.

```js
function non_strict() {
    return this;
}

function strict(){
    'use strict';
    return this;
}

non_strict() === window; // true in browser 
non_strict() === global; // true in node.js
strict() === undefined;  // true
```

The value of `this` in the function can be set using `call()` or `apply()` or `bind()`.

- [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

`call()` and `apply()` both calls the function with a new `this`-context whereas the `bind()` method creates a new function with the new context.

https://stackoverflow.com/a/31922712

> They all attach this into function (or object) and the difference is in the function invocation.
>
> call attaches this into function and executes the function immediately:
>
> bind attaches this into function and it needs to be invoked separately
>
> apply is similar to call except that it takes an array-like object instead of listing the arguments out one at a time.

#### Function Closures and the JavaScript Module Pattern

-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

> A closure is the combination of a function and the lexical environment within which that function was declared.

Functions can capture variables when they are declared, and can be used afterwards even when those variables are not in scope anymore.

```js

function createPerson(name){
    return {
        getName: function(){
            return name;
        }
    }
}

const person = createPerson("Lars")
console.log(person.getName()); // Lars
``` 

In the above example, the parameter `name` was captured by the function in the key `getName`. We can then use the `name` value when calling the function.

> The reason is that functions in JavaScript form closures. A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created. In this case, `getName` is a reference to the instance of the function displayName created when makeFunc is run. The instance of displayName maintains a reference to its lexical environment, within which the variable name exists. For this reason, when `getName` is invoked, the variable name remains available for use.

In the above example, we have effectively created a private readonly member variable on the object returned from the `createPerson` function.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Emulating_private_methods_with_closures

```js 

function createCounter(x = 0) {
  
  let privateCounter = x;

  return {
    increment: function() {
      privateCounter++;
    },
    decrement: function() {
      privateCounter--;
    },
    value: function() {
      return privateCounter;
    }
  };   
}

const counter = createCounter(0);

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

#### Immediately-Invoked Function Expressions (IIFE)

- https://developer.mozilla.org/en-US/docs/Glossary/IIFE

Immediately-Invoked Function Expressions refer to when developers create a one-time function and immediately invoke that function.

This is done to hide variables from the outer context, since variables declared inside a function-scope is only visible inside that same scope.

```js 
(function () {
    let name = "Lars";
})();

console.log(name); // throws "Uncaught ReferenceError: aName is not defined"
```

#### JavaScripts Prototype

- https://www.w3schools.com/js/js_object_prototypes.asp
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
- https://medium.freecodecamp.org/prototype-in-js-busted-5547ec68872

> JavaScript is often described as a prototype-based language — to provide inheritance, objects can have a prototype object, which acts as a template object that it inherits methods and properties from. An object's prototype object may also have a prototype object, which it inherits methods and properties from, and so on. This is often referred to as a prototype chain, and explains why different objects have properties and methods defined on other objects available to them.

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.description = function(){
    return "Name: " + this.name + ", Age: " + this.age;
}

const person = new Person("Lars", 10**10);
console.log(person.description()); // Name: Lars, Age: 10000000000
```

In the above example, we added the `description` method to the `Person` prototype. Because of this, all new instances of the `Person` type will have this method.

An alternative without using prototypes:

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.description = () => "Name: " + this.name + ", Age: " + this.age;
}

const person = new Person("Lars", 10**10);
console.log(person.description()); // Name: Lars, Age: 10000000000
```

### User-defined Callback Functions (writing your own functions that take a callback)

- https://developer.mozilla.org/en-US/docs/Glossary/Callback_function

> A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Callback functions are often used as another form of `return` or to specify/extend some functionality (`map`, `forEach`, `reduce`, `filter`).

> Note, however, that callbacks are often used to continue code execution after an asynchronous operation has completed — these are called asynchronous callbacks. A good example is the callback functions executed inside a .then() block chained onto the end of a promise after that promise fulfills or rejects. This structure is used in many modern web APIs, such as fetch().

```js
function condUpperCase(str, cb) {
    return str.split('').map((c, index) => cb(c, index, str) ? c.toUpperCase() : c).join('');
}

function formatName(name) {
    return condUpperCase(name.toLowerCase(), (c, i, str) => i == 0 || str[i - 1] == ' ');
}

console.log(formatName("larS larSeN")) // Lars Larsen
```

### Explain the methods map, filter and reduce

#### `map`

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

> The map() method creates a new array with the results of calling a provided function on every element in the calling array.

The map method is used to perform some transformation on all the elements in an array. The transformation is defined by the callback provided to the `map` call.

```js

const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n ** 2);
console.log(squares); // [1, 4, 9, 16, 25]

function createPerson(name) {
    return {name};
}

const people = [createPerson("Lars"), createPerson("Thomas"), createPerson("Kasper")];
const names = people.map(person => person.name);
console.log(names); // ['Lars', 'Thomas', 'Kasper']
```

In the first example we used the `map` method to transform an array of numbers to their square value.
In the second example we used the `map` method to transform an array of people to their names.
This is an example of how callbacks can be used to extend/specify the behavior and utility of defined functions.

Note that the `map` method does not modify the source array.

#### `filter`

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

> The filter() method creates a new array with all elements that pass the test implemented by the provided function.

The `filter` method is used to apply some test to each value in an array. The result array contains all the elements where the test passed. The test is provided to `filter` in the form of a callback.

Note that the `filter` method does not modify the source array.

```js
const numbers = [1, 2, 3, 4, 5];
const greaterThan3 = numbers.filter(n => n > 3);
console.log(greaterThan3); // [4, 5]
```

#### `reduce`

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

> The reduce() method executes a reducer function (that you provide) on each member of the array resulting in a single output value.

The `map` method is used to transform the elements of some array to another array. The `reduce` method transforms a source array into a single value.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

### Provide examples of user-defined reusable modules implemented in Node.js

// TODO

### Provide examples and explain the es2015 features: let, arrow functions, this, rest parameters, de-structuring assignments, maps/sets etc.

#### `let`

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

> The let statement declares a block scope local variable, optionally initializing it to a value.

The `let` keyword is used to declare a variable. Variables declared using `let` are not hoisted, in contrast to those declared using `var`. 

#### arrow functions

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

Arrow functions are expressions that create functions. These functions does not have a name, like normal anonymous functions.

```js
// Short arrow function
const adder = (a, b) => a + b;

// Long arrow function
const adder = (a, b) => {
    return a + b;
}

// Normal anonymous function
const adder = function(a, b) {
    return a + b;
}
```

As seen above, there are two forms of arrow functions. The long form of the arrow functions have the syntax `parameters => {statements*}`. The short form of the arrow function have the syntax `parameters => expression`. 
When using the short form of arrow function, the evaluated `expression` is returned from the function.

Arrow functions differ from normal anonymous function. Arrow functions inherit their `this` context from their environment, whereas the `this` context of normal anonymous functions are defined from their call context.

```js
function Person(name){
    this.name = name;
    return {
        a: () => this.name,
        b: function() {
            return this.name;
        }
    }
}

const person = new Person("Lars");
console.log(person.a()); // "Lars"
console.log(person.b()); // undefined

```
In the above example it can be seen that:
- Arrow functions inherit their `this` context. The arrow function on the key `a` inherits its `this` context from the `Person` function constructor, and can therefor access `this.name`.
- Normal anonymous functions do not inherit their `this` context. The anonymous function on the key `b` cannot access `this.name` since `this` has not been set using `bind` (seen below).

```js
function Person(name){
    this.name = name;
    return {
        a: () => this.name,
        b: (function() {
            return this.name;
        }).bind(this)
    }
}

const person = new Person("Lars");
console.log(person.a()); // "Lars"
console.log(person.b()); // "Lars"
```

#### rest parameters

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

> The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

We can therefore call a function with an unknown number of variable using _normal_ syntax.

```js
function concat(... strings) {
    return strings.join('')
}

console.log(concat("Lars", "Larsen")); // "LarsLarsen"
```

From the above example it can be seen that we can provide any number of arguments to the `concat` function. The provided arguments are then passed as an array.

Rest Parameters can be used to create prettier APIs, ie. `concat(["Lars", "Larsen"])` vs `concat("Lars", "Larsen")`.

#### de-structuring assignments

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

> The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

```js

const [one, two, three] = [1, 2, 3];
const {a, b, c, d} = {a: "a", b: "b", c: "c"};

console.log(one); // 1
console.log(a); // "a"
console.log(d); // undefined

```

Rest parameters and de-structuring assignments can be combined into:

```js
const [first, second, ... rest] = [1, 2, 3, 4, 5];

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

```

#### maps/sets

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Maps and sets are both collection types for values.

> The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
>
> The Set object lets you store unique values of any type, whether primitive values.

Maps:

> Key equality is based on the "SameValueZero" algorithm: NaN is considered the same as NaN (even though NaN !== NaN) and all other values are considered equal according to the semantics of the === operator. In the current ECMAScript specification -0 and +0 are considered equal, although this was not so in earlier drafts. See "Value equality for -0 and 0" in the browser compatibility table for details.

> Objects are similar to Maps in that both let you set keys to values, retrieve those values, delete keys, and detect whether something is stored at a key. Because of this (and because there were no built-in alternatives), Objects have been used as Maps historically; however, there are important differences that make using a Map preferable in certain cases:
  
> The keys of an Object are Strings and Symbols, whereas they can be any value for a Map, including functions, objects, and any primitive.
> - The keys in Map are ordered while keys added to object are not. Thus, when iterating over it, a Map object returns keys in order of insertion.
> - You can get the size of a Map easily with the size property, while the number of properties in an Object must be determined manually.
> - A Map is an iterable and can thus be directly iterated, whereas iterating over an Object requires obtaining its keys in some fashion and iterating over them.
> - An Object has a prototype, so there are default keys in the map that could collide with your keys if you're not careful. As of ES5 this can be bypassed by using map = Object.create(null), but this is seldom done.
> - A Map may perform better in scenarios involving frequent addition and removal of key pairs.

Sets:

> Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

> Because each value in the Set has to be unique, the value equality will be checked. In an earlier version of ECMAScript specification, this was not based on the same algorithm as the one used in the === operator. Specifically, for Sets, +0 (which is strictly equal to -0) and -0 were different values. However, this was changed in the ECMAScript 2015 specification. See "Value equality for -0 and 0" in the browser compatibility table for details.

### Explain and demonstrate how es2015 supports modules (import and export) similar to what is offered by NodeJS.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

The static import statement is used to import bindings which are exported by another module. Imported modules are in strict mode whether you declare them as such or not. 

```
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
var promise = import("module-name"); // This is a stage 3 proposal.
```

We can use `import` to access declarations from other files.

```
src
 | main.js
 | exports.js
```

Assuming the above structure, we can access declarations in `export.js` from `main.js`

```js
//  exports.js

const a = () => "a";
const b = () => "b";
const c = () => "c";

export default a;
export b;
export c;

```

```js
// main.js
import a from "./exports.js";
```

```js
// main.js
import a, {b, c} from "./exports.js";
```

Here we have combined both default and normal export statements.

- https://til.hashrocket.com/posts/xrtndhi1hi-default-and-named-exports-from-the-same-module

### Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance#ECMAScript_2015_Classes

ES6 allows for inheritance using the `class` and `extends` keywords.

```js
class Person {
    
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
      return "My name is " + this.name;
  };
}

class Teacher extends Person {
    
    constructor(name, subject){
        super(name, 10**5); // Teachers are always old
        this.subject = subject;
    }
    
  greeting() {
      return "My name is " + this.name + ", and I teach " + this.subject;
  };
}

const person = new Person("Thomas", 21);
const teacher = new Teacher("Lars", "JavaScript");

console.log(person.greeting()); //  "My name is Thomas"
console.log(teacher.greeting()); // "My name is Lars, and i teach JavaScript"
```

Above we have demonstrated ES6 inheritance, by inheriting the `name` and `age` properties. We have additionally overwritten the `greeting` method on the `Person` class. 

Classes in ES6 are still represented using prototypical object oriented programming. 

> JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance. The class syntax does not introduce a new object-oriented inheritance model to JavaScript.

The properties on the objects are still dependant on the prototype of the `Person` and `Teacher` _class_, and can therefor be extended using `Person.prototype` and `Teacher.prototype`.

### Provide examples with es-next, running in a browser, using Babel and Webpack

// TODO

### Provide a number of examples to demonstrate the benefits of using TypeScript, including, types, interfaces, classes and generics.

Typescript aims to provide compile-time type-safety. Typescript compiles down the JavaScript.

// TODO

### Explain the ECMAScript Proposal Process for how new features are added to the language (the TC39 Process)

- http://2ality.com/2015/11/tc39-process.html
- https://tc39.github.io/process-document/

> TC39 is the committee that evolves JavaScript. Its members are companies (among others, all major browser vendors). TC39 meets regularly, its meetings are attended by delegates that members send and by invited experts. Minutes of the meetings are available online and give you a good idea of how TC39 works.

> TC39 means Technical Committee number 39. It is part of ECMA, the institution which standardizes the JavaScript language under the “ECMAScript” specification. It works on the standardization of the general purpose, cross platform, vendor-neutral programming language that is ECMAScript. This includes the language syntax, semantics, libraries, and complementary technologies that support the language.

> Since ES6 came out, TC 39 streamlined the proposal previsioning process to meet modern expectations. The new process uses a superset of HTML to format the proposals. They use GitHub pull requests, which helped boost participation from the community. The number of proposals being made also increased.
  
> The specification is now more of a living standard, meaning that proposals see adoption faster, and we don’t spend years waiting for a new edition of the specification to come out.


#### Process 

> ##### Stage 0: Strawman
> Any discussion, idea, change, or addition which has not yet been submitted as a formal proposal is considered to be a “strawman” proposal at this stage. Only members of TC39 can create these proposals, and there’s over a dozen active strawman proposals today.
>  
> ##### Stage 1: Proposal
> At this stage, a proposal is formalized and expected to address cross-cutting concerns, interactions with other proposals, and implementation concerns. Proposals in this stage identify a discrete problem and offer a concrete solution to that problem.
> 
> At this stage, proposal often includes a high level API description, usage examples, and a discussion of internal semantics and algorithms. These proposals are likely to change significantly as they make their way through the process.
>  
> ##### Stage 2: Draft
>  Proposals in this stage should offer an initial draft of the specification.
>  
>  At this point, it’s reasonable for implementers to begin experimenting with actual implementations in runtime. The implementation could come in many forms: a polyfill, user code that mangles the runtime into adhering to the proposal, an engine implementation (which natively provides support for the proposal), or it could be support by a build-time compiler like Babel.
>  
> ##### Stage 3: Candidate
>  Proposals in this stage are candidate recommendations. At this advanced stage, the specification editor and designated reviewers must have signed off on the final specification. A Stage 3 proposal is unlikely to change beyond fixes to issues identified in the wild.
>  
>  Implementers should have expressed interest in the proposal as well — a proposal without support from implementers is dead in the water. In practice, proposals move to this level with at least one browser implementation, a high-fidelity polyfill, or when supported by a build-time transpiler like Babel.
> 
> ##### Stage 4: Finished
> Finally, proposals get to this stage when there are at least two independent implementations that pass acceptance tests.

## Callbacks, Promises and async/await

### Explain about promises in ES-6 including, the problems they solve, a quick explanation of the Promise API.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

Promises are objects that aim to replace callbacks with a standard api.

> A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.
>
> A Promise is in one of these states:
>  
> - pending: initial state, neither fulfilled nor rejected.
> - fulfilled: meaning that the operation completed successfully.
> - rejected: meaning that the operation failed.

> A pending promise can either be fulfilled with a value, or rejected with a reason (error). When either of these options happens, the associated handlers queued up by a promise's then method are called. (If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.)

```js
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
```
In the above example we use the Promise API, since the `fetch` function returns a promise. We use the `then` method on the `Promise` object to specify the operation to take when the promise has been resolved. Similarly the `catch` method specifies the operation to take when an error occurs. In the case of the fetch API, the `catch` method is called when the request cannot be sent (network problems).

The `then` method always return a new `Promise`, even in the example below.

```js
new Promise((resolve) => {
    resolve(1)  
})
.then(n => n + 1)  // Method call returns a Promise, allowing for then calls to be chained 
.then(console.log) // Logs 2
```

#### Example(s) that demonstrate how to avoid the callback hell  (“Pyramid of Doom")

The Pyramid of Doom refers to the structure of code when dealing with many calls using asynchronous callbacks.

```js
aync1((err1, result1) => {
    async2(result1, (err2, result2) => {
         async3(result2, (err3, result3) => {
               console.log(result3)
         })
    })
})
```

In the above example we use asynchronous callbacks, and end up with heavily indented code. An anternative version using the Promise API could look like this.

```js
aync1()
    .then(result1 => async2(result1))
    .then(result2 => async3(result2))
    .then(result3 => console.log(result3))
```

#### Example(s) that demonstrate how to execute asynchronous (promise-based) code in serial or parallel

In the above example the code is executed serially, and we do not have a choice since we depend on the result of the previous operation to perform the next operation.

There are a couple of ways to execute promise base code in parallel, below i show the `Promise.all` method.

```js
Promise.all([aync1(), async2(), async3()]).then(results => {
    const [result1, result2, result3] = results;
})
```

The `Promise.all` method waits for all the provided Promises to be resolved or rejected before calling `then` or `catch`.

#### Example(s) that demonstrate how to implement our own promise-solutions.

You implement promise-based solutions by creating a `new Promise`. The constructor takes a function `executor`, that takes two functions `resolver` and `rejector`.
The executor function contains the work done by the promise. When the promise has performed the required work, the promise can be solved by calling the `resolver` function. When an error occurs the `executor` can insted call the `rejector` function. The promise object then performs the work of calling the registered `then` or `catch` methods.

````js
const performWork = (param) => new Promise((resolve, reject) => {
   const result = performWork(param);
   if(result)
       resolve(result);
   else
       reject("Could not perform work.");
});

performWork(argument)
    .then(result => console.log(result))
    .catch(message => console.error("An error occurred: " + message));

````
#### Example(s) that demonstrate error handling with promises.

- https://hackernoon.com/promises-and-error-handling-4a11af37cb0e

`````js
// doAsyncOperation1() returns a promise.
doAsyncOperation1()
.then(() => {
  // ...
  // doAnotherAsyncOperation() returns a promise
  // which will be inserted into the chain.
  return doAsyncOperation2();
})
.then((output) => {
  // output will be the value resolved by the
  // promise which was returned from doAsyncOperation2()
  // ...
  return doAsyncOperation3();
})
.catch((err) => {
  // Handle any error that occurred in any of the previous
  // promises in the chain.
});
`````

#### Explain about JavaScripts async/await, how it relates to promises and reasons to use it compared to the plain promise API. 

`async` and `await` are keywords that allow for better syntax when using Promise-based APIs. `await` _pauses_ the execution until the provided promise hes been resolved.

```js 
const rows = async database.select(5);
console.log(rows);
```

Note that the execution is not really paused, and that the above code is equivalent to:

````js
database.select(5).then(rows => {
    console.log(rows);
})
````

The ``await`` keyword can only be used within functions declared using the `async` keyword.

`````js
async function a() {
    
}

const b = async () => undefined;
`````

An error occurs when attempting to use the ``await`` keyword within a non-`async` function. The `await` keyword can therefor not be used within the global context.