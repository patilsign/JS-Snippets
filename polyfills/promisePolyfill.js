function myPromisePolyfill(executer) {
  let onResolve, onReject, value;
  let fullfilled = false,
    rejected = false,
    called = false;

  function resolve(v) {
    console.log("inside resolve");

    fullfilled = true;
    value = v;
    if (typeof onResolve === "function") {
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    console.log("inside reject");
    rejected = true;
    value = reason;
    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (fullfilled && !called) {
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (rejected && !called) {
      onReject(value);
      called = true;
    }
    return this;
  };

  try {
    executer(resolve, reject);
  } catch (error) {
    console.log(error);
  }
}

const promise1 = new myPromisePolyfill((resolve, reject) => {
  console.log("1");
  setTimeout(() => {
    resolve(2);
  }, 1000);
  console.log("3");
});

promise1.then((res) => {
  console.log(res);
});

// Promise(resolve,reject) ------------------------------------------------------------------
myPromisePolyfill.resolve = (val) => {
  new myPromisePolyfill(function executer(resolve, reject) {
    resolve(val);
  });
};

myPromisePolyfill.reject = (val) => {
  new myPromisePolyfill(function executer(resolve, reject) {
    reject(val);
  });
};

// Promise.all() ------------------------------------------------------------------
myPromisePolyfill.all = (promises) => {
  let fullfilledPromises = [];
  const result = [];
  function executer(resolve, reject) {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          fullfilledPromises.push(true);
          result[index] = val;

          if (fullfilledPromises.length === promises.length) {
            return resolve(result);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  return new myPromisePolyfill(executer);
};

// Promise.allSettled() ------------------------------------------------------------------
function allSettled(promises) {
  let mappedPromises = promises.map((p) => {
    return p
      .then((value) => {
        return {
          status: "fulfilled",
          value,
        };
      })
      .catch((reason) => {
        return {
          status: "rejected",
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
}

// Promise.rece() ------------------------------------------------------------------
export function promiseRace(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise
        .then(resolve) // resolve outer promise, as and when any of the input promise resolves
        .catch(reject); // reject outer promise, as and when any of the input promise rejects
    });
  });
}

// Promise.any() ------------------------------------------------------------------
function any(promises) {
  let results = [];
  var counter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then((result) => {
        resolve(result);
      }).catch((err) => {
        results.push(err);
        ++counter;
        if (counter === promises.length) {
          reject(results);
        }
      });
    });
  });
}
