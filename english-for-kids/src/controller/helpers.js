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

export function getStatsRecord(id) {
    let record = localStorage.getItem(id);
    if (!record) {
      record = {
        r: 0,
        w: 0,
        t: 0
      };
    } else {
      record = JSON.parse(record);
    }
    return record;
}