// const a = "a";
// const b = "b";
// const c = "c";
// 
// const d = {a, b, c}
// const e = {
//   a,
//   method() {
//   	return this.a
//   }
// };

"use strict";

var a = "a";
var b = "b";
var c = "c";
var d = {
    a: a,
    b: b,
    c: c
};
var e = {
    a: a,
    method: function method() {
        return this.a;
    }
};