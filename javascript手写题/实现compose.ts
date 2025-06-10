/**
 * 组成新的函数
 * const addOne = (num) => num + 1;
 * const subTen = (num) => num - 10;
 * const double = (num) => num * 2;
 * const divThree = (num) => num / 3;
 * const compose1 =  compose(divThree, addOne, subTen, double)
 
 * 执行新的函数
 * console.log('compose1 result:', compose1(9))
 * compose1 result: -12
 */
const myCompose = (...fnArr) => {
    return (param) => {
        let ret = param;
        if (fnArr.length === 0) return param
        for (let i = fnArr.length - 1; i >= 0; --i) {
            ret = fnArr[i](ret);
        }
        return ret;
    }
}

// 太抽象了
const myCompose2 = (...fns) =>
    // 注意 f、g 的位置，如果实现从左到右计算，则置换顺序
    fns.reduce((f, g) => (...args) => f(g(...args)))

// const addOne = (num) => num + 1;
// const subTen = (num) => num - 10;
// const double = (num) => num * 2;
// const divThree = (num) => num / 3;
// const compose1 =myCompose2(divThree, addOne, subTen, double)