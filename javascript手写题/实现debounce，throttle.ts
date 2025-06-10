/**
 * 防抖(debounce)
 * 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 */
const myDebounce = (fn, delay) => {
    let timer: any = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

/**
 * 节流(throttle)
 * 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 */
const myThrottle = (fn, wait) => {
    let timer: any = null
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
            }, wait)
        }
    }
}