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


export function createDifficultArr(cards) {
    let arr = [];
    cards.forEach((e) => {
        arr.push(...e.cards.map((c) => {
          const record = getStatsRecord(c.id);
          return {
            id: c.id,
            wrong: record.w,
          }
        }))
    });
    arr = arr.sort((a, b) => b.wrong - a.wrong).filter(e => e.wrong > 0).slice(0, 8);
    const result = [];
    cards.forEach((e) => 
        result.push(...e.cards.filter(c => 
            arr.findIndex(a => a.id === c.id) >= 0
        ))
    );
    return result;
}