class LRUCache {
    limit: number;
    lruMap: Map<number, number[]>;
    time: number;

    constructor(capacity: number) {
        this.limit = capacity;
        this.lruMap = new Map<number, number[]>();
        this.time = 0;
    }

    get(key: number): number {
        return this.lruMap.has(key) ? (this.lruMap.get(key) as number[])[0] : -1
    }

    put(key: number, value: number): void {
        // const [val] = this.lruMap.get(key);
        // if (val ) {
            
        // }
        if (this.lruMap.size < this.limit) {
            this.lruMap.set(key, [value, this.time])
        } else {

        }
        ++ this.time;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4