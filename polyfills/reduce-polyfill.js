const arr = [1, 2, 6, 3, 4];

const maxNum = arr.reduce((curr, acc) => {
  return (max = curr > acc ? curr : acc);
}, 0);
console.log("Without Polyfill :", maxNum);

Array.prototype.myReduce = function (cb, initialValue) {
  let acc = initialValue;
  for (let index = 0; index < this.length; index++) {
    acc = acc ? cb(acc, this[index], index, this) : this[index];
  }
  return acc;
};

const maxNumPolyfill = arr.myReduce((curr, acc) => {
  return curr+acc;
}, 0);
console.log("With Polyfill :", maxNumPolyfill);
