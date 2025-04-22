const arr = [1, 2, 3, 4];

const evenNum = arr.filter((item, index, arr) => {
  return item % 2 === 0;
});
console.log("Without Polyfill :", evenNum);

Array.prototype.myFilter = function (cb) {
  const temp = [];
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      temp.push(this[index]);
    }
  }
  return temp;
};

const evenNumPolyfill = arr.myFilter((item, index, arr) => {
  return item % 2 === 0;
});
console.log("With Polyfill :", evenNumPolyfill);
