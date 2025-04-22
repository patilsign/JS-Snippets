function outerFunction() {
  var outerVariable = "Hi, ";
  function innerFunction(name) {
    console.log(outerVariable + name); // Hi Closure
  }
  return innerFunction;
}

var inner = outerFunction();
inner("Closure");

function outer() {
  var x = 10;
  function inner() {
    console.log(x); // 10
  }
  return inner;
}
var innerFunc = outer();
innerFunc();

function outer() {
  var x = 10;
  function inner() {
    console.log(x); // 20
  }
  var x = 20;
  return inner;
}
var innerFunc = outer();
innerFunc();

function test() {
  console.log(a); // undefined
  console.log(foo()); // 2

  var a = 1;
  function foo() {
    return 2;
  }
}

test();

var fullname = "John Doe";
var obj = {
  fullname: "Colin Ihrig",
  prop: {
    fullname: "Aurelio De Rosa",
    getFullname: function () {
      return this.fullname;
    },
  },
};

console.log(obj.prop.getFullname()); // 'Aurelio De Rosa'

var test = obj.prop.getFullname;

console.log(test()); // 'John Doe'

var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a); // 1                                    */

var a = 1;

function someFunction(number) {
  function otherFunction(input) {
    return a;
  }

  a = 5;

  return otherFunction;
}

var firstResult = someFunction(9);
var result = firstResult(2);

console.log(result); // 5
