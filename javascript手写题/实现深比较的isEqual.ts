/**
 * 如何实现一个深比较的函数 deepEqual
 */

const isEqual = (x, y) => {
    if (x === y) return true;
    if (x === null || y === null) return false;
    if (typeof x === 'object' && typeof y === 'object') {
        const xkeys = Object.keys(x);
        const ykeys = Object.keys(y);
        if (xkeys !== ykeys) return false
        xkeys.forEach(key => {
            if (!isEqual(x[key], y[key])) return false;
        })
        return true;
    }
    return false;
}