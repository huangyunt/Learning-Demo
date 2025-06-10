// 浅拷贝
const shallowCloneObject = (obj) => {
    return { ...obj }
}

const shallowCloneObject2 = (obj) => {
    return Object.assign({}, obj)
}

// 深拷贝-通过JSON.stringify实现
// 1、无法拷贝函数、正则、Date、Set、Map等特殊对象，这些对象会被忽略或者转为普通值
// 2、无法处理循环引用
// 3、自定义对象都会被转为普通对象，无法保留自定义对象的原型链和继承关系
// 4、丢失 undefined 和 Symbol 属性
// 5、序列化和反序列化开销大：相比专用深拷贝库，性能较差
const deepCloneObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

// 深拷贝-通过递归遍历
const deepCloneObject2 = (obj) => {
    const map = new WeakMap();
    const newObj = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (value === null) {
            newObj[key] = value;
        }
        else if (Array.isArray(value)) {

        }
        else if (typeof value === 'object') {
            const clonedObj = map.get(value) ? map.get(value) : deepCloneObject2(value)
            newObj[key] = deepCloneObject2(value)
        }
        else {
            newObj[key] = value;
        }
    })

    return newObj;
}