const arr = [1, 2, 3, 4];

arr.forEach((item, index, arr) => {
  console.log(item, ",", index, ",", arr);
});

// Polyfill -------

Array.prototype.myForEach = function (cb) {
  for (let index = 0; index < this.length; index++) {
    cb(this[index], index, this);
  }
};

arr.myForEach((item, index, arr) => {
  console.log(item, ",", index, ",", arr);
});
