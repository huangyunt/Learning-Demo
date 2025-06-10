/**
 * 实现 Array.prototype.reduce 
 
 * reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (x, y) => x + y);
 * 输出：55
 
 * reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (x, y) => x + y, 100);
 * 输出：155
 
 * reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (x, y) => x + y, undefined);
 * 输出：NaN

 */
const myReduce = (arr, fn, initValue) => {
    let next = initValue
    arr.forEach((item) => {
        next = fn(next, item)
    })
    return next;
}

