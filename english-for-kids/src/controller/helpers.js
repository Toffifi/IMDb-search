export function setActiveCategory(arr, name) {
    if (arr.find((e) => e.active).name !== name) {
        return arr.map((e) => {
            if (e.name === name) {
                e.active = true;
            } else {
                e.active = false;
            }
            return e;
        })
    } else {
        return arr;
    }
}