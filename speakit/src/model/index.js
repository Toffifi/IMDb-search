export default async function getData(page, group, first) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    const data = []
    for (const e of json) {  
        const yandexKey = 'trnsl.1.1.20200424T133418Z.ae0571c94dea29d2.b18c022405024d1367defaaa83ae91411a69e136'      
        const yandex = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&text=${e.word}&lang=en-ru`);
        const yJson = await yandex.json();
        data.push({
            word: e.word,
            transcription: e.transcription,
            image: e.image,
            audio: e.audio,            
            translation: yJson.text[0]
        })
    }
    if(first){
        return data.slice(0, 10);
    } else {
        return data.slice(10);
    }
}