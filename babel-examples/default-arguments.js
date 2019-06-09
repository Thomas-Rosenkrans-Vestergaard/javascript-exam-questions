// function createPerson(age, name = "Lars") {}

"use strict";

function createPerson(age) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Lars";
}