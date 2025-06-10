export const unique = (arr: any[]) => {
    return [...new Set(arr)]
}

export const unique2 = (arr: any[]) => {
    return arr.filter((item, index) => {
        return arr.findIndex((element) => element === item) === index
    })
}

