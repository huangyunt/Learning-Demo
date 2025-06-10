/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
    return Promise.resolve(a + b);
}

function sum(arr) {
    
}

// 追加问题：如何控制 add 异步请求的并发次数