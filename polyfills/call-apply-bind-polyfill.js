const person = {
  name: "Santosh",
};

function printName(city) {
  console.log(`${this.name} from ${city}`);
}

printName.call(person, "Hyd");

Function.prototype.myCall = function (context, ...args) {
  context.fn = this;
  context.fn(...args);
};
printName.myCall(person, "Pune");

Function.prototype.myApply = function (context, args = []) {
  context.fn = this;
  context.fn(args);
};
printName.myApply(person, ["Delhi"]);

Function.prototype.myBind = function (context, args) {
  context.fn = this;
  return function (...newArgs) {
    context.fn(...args, ...newArgs);
  };
};
const printDetails = printName.myBind(person, ["Mumbai"]);
printDetails();
