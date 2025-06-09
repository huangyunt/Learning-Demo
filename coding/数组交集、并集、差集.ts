// 数组交集
export const intersecttionOfArray = (arr1: any[], arr2: any[]) => {
    return arr1.filter(item => {
        return arr2.includes(item)
    })
}

// 数组并集
export const unionOfArray = (arr1: any[], arr2: any[]) => {
    return new Set([...arr1, ...arr2])
}

// 数组差集
export const diffierenceOfArray = (arr1: any[], arr2: any[]) => {
    return arr1.filter((item) => {
        return !arr2.includes(item)
    })
}


