/**
 * 实现一个函数 maxBy，根据给定条件找到最大的数组项
 * const data = [{ value: 6 }, { value: 2 }, { value: 4 }];
 * maxBy(data, (x) => x.value);
 * => { value: 6 }
 */

const maxBy = (list, keyBy) =>
    list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y));


/**
 * Output: {
 * "1": {
 *  "id": 1,
 *  "name": "XXX"
 * },
 * "2": {
 *   "id": 2,
 *   "name": "xxx"
 * }
 *}
 * keyBy(
 *   [
 *       { id: 1, name: "XXX" },
 *       { id: 2, name: "xxx" },
 *   ],
 *   (x) => x.id,
 *);
 */

 const keyBy = (arr, keyFn) => {
    const keys = arr.map(item => keyFn(item));
    const ret = {};
    keys.forEach((key, index) => {
        ret[key] = arr[index]
    });
    return ret
 }