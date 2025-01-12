/* eslint-disable no-restricted-syntax */
/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  return new Promise((resolve, reject) => {
    if (isPositiveAnswer === true) {
      resolve('Hooray!!! She said "Yes"!');
    }
    if (isPositiveAnswer === false) {
      resolve('Oh no, she said "No".');
    } else {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    }
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return Promise.all(array).then((res) => (res));
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return Promise.race(array).then((res) => (res));
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
async function chainPromises(promises, action) {
  const successArr = [];
  const failArr = [];
  await promises.map((prom) => prom.then((res) => successArr.push(res),
    (er) => failArr.push(er)));
  return successArr.reduce(action);
}
/* function chainPromises(promises, action) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((success, fail) => {
    const successArr = [];
    const failArr = [];
    if (promises.length === 0) success(successArr);
    let pending = promises.length;
    promises.forEach((promise, i) => {
      promise.then((result) => {
        successArr[i] = result;
        pending -= 1;
        if (pending === 0) success(successArr);
      }, (error) => { failArr[i] = error; });
    });
  }).then((res) => (res.reduce(action)), (err) => err).then((res) => (res), (err) => err);
}
/* function chainPromises(promises, action) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((success, fail) => {
    const successArr = new Array(promises.length);
    const failArr = [];
    if (promises.length === 0) success(successArr);
    let pending = promises.length;
    promises.forEach((promise, i) => {
      promise.then((result) => {
        successArr[i] = result;
        pending -= 1;
        if (pending === 0) success(successArr);
      }, (error) => {
        failArr[i] = error;
      });
    });
  }).then((res) => (res.reduce(action)), (err) => err).then((res) => res, (err) => err);
}
*/
/*
async function chainPromises(array, action) {
  const arr = [];
  const arrErr = [];
  for await (const a of array) {
    a.then((res) => arr.push(res)).catch((res) => arrErr.push(res));
  }
  const res = arr.reduce(action);
  return res;
}
/* function chainPromises(array, action) {
      return Promise.allSettled(array)
         .then((res) => (res.reduce(action))).then((res)
          => (res)).catch(new Error('Wrong parameter is passed! Ask her again.'));
}
// function chainPromises(array, action) {
//   return Promise.allSettled(array)
//  .then((res) =>  console.log(res)).catch(new Error('Wrong parameter is passed! Ask her again.'));
// }
// const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
// chainPromises(promises, (a, b) => a + b); */
module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
