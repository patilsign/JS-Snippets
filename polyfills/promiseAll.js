const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 1");
  }, 1000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("rejected 2");
  }, 2000);
});

const p3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 3");
  }, 3000);
});

const p4 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 4");
  }, 3000);
});

Promise.all([p1, p2, p3])
  .then((res) => {
    console.log("Promise All :", res);
  })
  .catch((err) => {
    console.log("Promise All :", err);
  });

Promise.all([p1, p3, p4])
  .then((res) => {
    console.log("Promise All :", res);
  })
  .catch((err) => {
    console.log("Promise All :", err);
  });

Promise.any([p2, p3, p4])
  .then((res) => {
    console.log("Promise Any :", res);
  })
  .catch((err) => {
    console.log("Promise Any :", err);
  });
Promise.allSettled([p1, p2, p3, p4])
  .then((res) => {
    console.log("Promise AllSettled :", res);
  })
  .catch((err) => {
    console.log("Promise AllSettled :", err);
  });

Promise.race([p1, p2, p3, p4])
  .then((res) => {
    console.log("Promise Race :", res);
  })
  .catch((error) => {
    console.log("Promise Race :", error);
  });

Promise.race([p2, p3, p4])
  .then((res) => {
    console.log("Promise Race :", res);
  })
  .catch((error) => {
    console.log("Promise Race :", error);
  });
