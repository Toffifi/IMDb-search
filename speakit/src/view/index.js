export default class View{
    constructor(data, getLevel, getPage, game, gaming, word, getGuessed, guessed){
        this.data = data;
        this.getLevel = getLevel;
        this.getPage = getPage;
        this.game = game;
        this.gaming = gaming;
        this.getGuessed = getGuessed;
        this.word = word || '';
        this.guessed = guessed;
    }
    
    init(first){
        if (first) {
            this.start();
            this.headerButton();
            this.arrowFunc();
        }
        document.querySelector('.img').style.backgroundImage = `url('files/blank.jpg')`;
        
        this.drow();
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

    drow() {
        const container = document.querySelector('.words');
        container.innerHTML = '';
        const input = document.querySelector('.word');
        input.innerHTML = '';
        const img = document.querySelector('.img');
        const btnContainer = document.querySelector('.buttons');
        const btn = document.createElement('div');
        
        if(!this.gaming){
            input.innerHTML = '';
            btnContainer.innerHTML = '';
            btn.className = 'startGame';
            btn.innerHTML = 'Start Game';
            btn.addEventListener('click', () => {
                this.game(true);
            })
        }else{
            input.innerHTML = '<i class="fas fa-microphone"></i><p class = "gameInput"></p>';
            btnContainer.innerHTML = '';
            btn.className = 'stop';
            btn.innerHTML = 'Stop'
            btn.addEventListener('click', () => {
                this.game(false);
            })
            const gameInput = document.querySelector('.gameInput');
            if(gameInput.innerHTML !== this.word){
                gameInput.innerHTML = this.word;
            }
        }
        btnContainer.appendChild(btn);

        this.data.forEach((e) => {
            if(e.word.toUpperCase() === this.word.toUpperCase()){
                e.done = true
            }
            const div = document.createElement('div');
            div.className = `word_btn ${e.word}`;
            if(e.done){
                div.classList.add('done');

            }

            div.innerHTML = `<i class="fas fa-volume-up"></i><div><p>${e.word}<p>${e.transcription}</p></div>`;
            container.appendChild(div);

            if(!this.gaming){
                div.classList.remove('done');
                div.classList.add('train');
                const audio = document.createElement('audio');
                audio.innerHTML = `<source src="${e.audio}" type="audio/mpeg">`;
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
            }
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