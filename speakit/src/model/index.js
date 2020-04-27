export default async function getData(page, group, second) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    const data = []
    const promises = [];
    
    let start = 0;
    let end = 10;

    if(second){
        start = 10;
        end = 20;
    }
    for (let i = start; i < end; i++) {
        data.push({
            word: json[i].word,
            transcription: json[i].transcription,
            image: json[i].image,
            audio: json[i].audio
        })
        promises.push(getYandex(json[i].word));
    }

    await Promise.all(promises)
        .then(r => data.forEach((e, i) => e.translation = r[i].text[0]));
    return data;
}

function getYandex(word) {
    const yandexKey = 'trnsl.1.1.20200424T133418Z.ae0571c94dea29d2.b18c022405024d1367defaaa83ae91411a69e136'      
    return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&text=${word}&lang=en-ru`)
        .then((result) => result.json());

}