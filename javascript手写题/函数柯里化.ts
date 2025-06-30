// sum(1, 2, 3).sumOf(); 输出：6
// sum(2, 3)(2).sumOf(); 输出：7
// sum(1)(2)(3)(4).sumOf(); 输出：10
// sum(2)(4, 1)(2).sumOf(); 输出：9

const sum = (...args: number[]) => {
    let ans = 0;

    ans += args.reduce((prev, curr) => prev + curr, 0)

    const sumObj = (...args: number[]) => {
        ans += args.reduce((prev, curr) => prev + curr, 0)
        return sumObj
    }

    sumObj.sumOf = () => ans

    return sumObj
}

// 测试示例
console.log(sum(1, 2, 3).sumOf()); // 输出：6
console.log(sum(2, 3)(2).sumOf()); // 输出：7
console.log(sum(1)(2)(3)(4).sumOf()); // 输出：10
console.log(sum(2)(4, 1)(2).sumOf()); // 输出：9

