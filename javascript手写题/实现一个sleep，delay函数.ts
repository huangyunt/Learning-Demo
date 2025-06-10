const sleep = (time: number) => new Promise((res) => setTimeout(() => res('done'), time))

// function delay(func, seconds, ...args) {}

// // 在 3s 之后返回 hello, world
// await delay((str) => str, 3000, "hello, world");

// // 在 3s 之后返回 hello, world，第一个函数可返回 promise
// await delay((str) => Promise.resolve(str), 3000, "hello, world");

const delay = (fn: any, time: number, ...args: any[]) => {
    return new Promise((res, rej) => {
        setTimeout(() => res(fn(...args)), time)
    })
}

const delay2 = (fn: any, time: number) => (...args) => setTimeout(() => fn(...args), time)


