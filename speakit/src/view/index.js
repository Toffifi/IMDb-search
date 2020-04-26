export default class View{
    constructor(data, getLevel, getPage){
        this.data = data;
        this.getLevel = getLevel;
        this.getPage = getPage;
    }
    
    init(first){
        if (first) {
            this.start()
            this.headerButton()
            this.arrowFunc()
        }
        document.querySelector('.img').style.backgroundImage = `url('files/blank.jpg')`;
        this.addWords()
    }

    headerButton() {
        const buttons = document.querySelectorAll('.level-btn');
        buttons.forEach((e) => {
            e.addEventListener('click', (event) => {
                buttons.forEach((i) => {
                    i.classList.remove('active');
                })
                event.target.classList.add('active');
                this.getLevel(e.id);
            })
        })
    }

    addWords() {
        const container = document.querySelector('.words');
        container.innerHTML = '';
        const input = document.querySelector('.word');
        input.innerHTML = '';
        const img = document.querySelector('.img')
        this.data.forEach((e) => {
            const div = document.createElement('div');
            div.className = 'word_btn';
            const audio = document.createElement('audio');
            div.innerHTML = `<i class="fas fa-volume-up"></i><div><p>${e.word}<p>${e.transcription}</p></div>`;
            audio.innerHTML = `<source src="${e.audio}" type="audio/mpeg">`;
            container.appendChild(div);
            div.appendChild(audio);
            div.addEventListener('click', () => {
                audio.play();
                input.innerHTML = `<p>${e.translation}</p>`;
                img.style.backgroundImage = `url('${e.image}')`;
                document.querySelectorAll('.word_btn').forEach((e) => {
                    e.classList.remove('active');
                })
                div.classList.add('active');
            })
        })
    }

    arrowFunc() {
        const right = document.querySelector('.right_arrow');
        const left = document.querySelector('.left_arrow');
        right.addEventListener('click', () => {
            this.getPage(true);
        })
        left.addEventListener('click', () => {
            this.getPage(false);
        })
    }

    start(){
        const btn = document.querySelector('.start');
        const modal = document.querySelector('.modal');
        btn.addEventListener('click', () => {
            modal.style.display = 'none';
        })
    }
}