// 封装成promise
// const fs = require('fs')

// fs.readFile('./a.txt', 'utf-8', function (err, data) {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
// })

// const myReadFile = (path) => {
//     return new Promise((res, rej) => {
//         fs.readFile(path, 'utf-8', function (err, data) {
//             if (err) {
//                 rej(err)
//             }
//             res(data)
//         })
//     })
// }

/**
 * ------ 实现一个Promise.all -------
 * await Promise.all([1, 2, 3]);
 * 输出： [1, 2, 3]
 
 * await Promise.all([1, Promise.resolve(2), 3]);
 * 输出：[1, 2, 3]
 
 * await Promise.all([1, Promise.resolve(2)]);
 * 输出：[1, 2]
 
 * await Promise.all([1, Promise.reject(2)]);
 * 输出：Throw Error: 2
 */

const myPromiseAll = (promiseArr: Promise<number>[]) => {
    const retr = Array(promiseArr.length).fill(0);
    let flag = 0
    return new Promise((res, rej) => {
        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise).then(
                (success) => {
                    retr[index] = success
                    if (++flag === promiseArr.length) res(retr);
                },
                (err) => {
                    rej(err)
                }
            )
        })
    })
}