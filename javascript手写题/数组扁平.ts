// 数组扁平化
const flatArray = (arr: any[]) => {
    return arr.flat(Infinity)
}

const flatArray2 = (arr: any[]) => {
    const retArr: any[] = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            retArr.push(...flatArray2(item))
        } else {
            retArr.push(item)
        }
    })
    return retArr;
}