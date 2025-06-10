/**
 * 实现一个发布订阅模式
 * const e = new Event();
 * e.on("click", (x) => console.log(x.id));
 * e.once("click", (x) => console.log(id));
 * //=> 3
 * e.emit("click", { id: 3 });
 * //=> 4
 * e.emit("click", { id: 4 });
 */

class myEventEmitter {
    events = {}

    emit(type, ...args) {
        const listeners = this.events[type]
        for (const listener of listeners) {
            listener(...args)
        }
    }

    on(type, listener) {
        this.events[type] = this.events[type] || []
        this.events[type].push(listener)
    }

    once(type, listener) {
        const callback = (...args) => {
            this.off(type, callback)
            listener(...args)
        }
        this.on(type, callback)
    }

    off(type, listener) {
        this.events[type] = this.events[type] || []
        this.events[type] = this.events[type].filter(callback => callback !== listener)
    }
}

const e = new myEventEmitter()

const callback = x => { console.log('Click', x.id) }
e.on('click', callback)
e.on('click', callback)

// 只打印一次
const onceCallback = x => console.log('Once Click', x.id)
e.once('click', onceCallback)
e.once('click', onceCallback)

//=> 3
e.emit('click', { id: 3 })

//=> 4
e.emit('click', { id: 4 })