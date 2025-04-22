const arr = [1, 2, 3, 4];

const doubleArr = arr.map((item, index, arr) => {
  return item * 2;
});
console.log("Without Polyfill :", doubleArr);

Array.prototype.myMap = function (cb) {
  const temp = [];
  for (let index = 0; index < this.length; index++) {
    temp.push(cb(this[index], index, this));
  }
  return temp;
};

const doubleArrPolyfill = arr.myMap((ele) => {
  return ele * 2;
});
console.log("Using Polyfill :", doubleArrPolyfill);
