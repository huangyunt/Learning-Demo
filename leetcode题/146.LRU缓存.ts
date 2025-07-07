class LRUCache {
    private map: Map<number, number>;
    private list: number[]
    private capacity: number;

    constructor(capacity: number) {
        this.map = new Map();
        this.list = [];
        this.capacity = capacity;
    }

    get(key: number): number {
        if (this.map.has(key)) {
            const value = this.map.get(key)!
            // 找到这个key，放在队头
            const flag = this.list.findIndex(item => item === key);
            this.list.splice(flag, 1);
            this.list.unshift(key)
            return value
        }
        return -1
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            this.map.set(key, value);
            // 找到这个key，放在队头
            const flag = this.list.findIndex(item => item === key);
            this.list.splice(flag, 1);
            this.list.unshift(key)
        } else {
            if (this.list.length < this.capacity) {
                this.list.unshift(key);
                this.map.set(key, value);
            } else {
                // 删掉最后的，放在队头
                const lastKey = this.list[this.list.length - 1];
                this.list.pop();
                this.map.delete(lastKey)

                this.list.unshift(key);
                this.map.set(key, value);
            }
        }
     }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */