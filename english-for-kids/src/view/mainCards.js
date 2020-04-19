import { clearCards } from './helpers';

const section = document.querySelector('section');
let startButton = null;
let starsContainer = null;
let audioRight = null;
let audioWrong = null;

export function cards(arr, linkClick, startGame) {
    const cards = document.createElement('div');
    cards.className = 'cards d-flex flex-auto flex-wrap justify-content-center';
    section.appendChild(cards);

    arr.forEach((e) => {
        const container = document.createElement('div');
        container.className = 'cards_container';
        container.addEventListener('mouseleave', () => {
            container.classList.remove('hover');
            card.style.transform = '';
        });
        cards.appendChild(container);

        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.id = `card_${e.id}`;
        container.appendChild(card);

        cardLayout(e.word, 'front', e.image, card, linkClick, e.id);
        cardLayout(e.translation, 'back', e.image, card);
        
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-sync-alt"></i>';
        button.className = 'btn btn-outline-info';
        button.addEventListener('click', () => {
            container.classList.add('hover');
            card.style.transform = 'rotateY(180deg)';
        });
        card.appendChild(button);
        
        createAudio(e.id, e.audioSrc, container);
    })

    startButton = document.createElement('div');
    startButton.className = 'btn btn-primary btn-lg start_but d-none';
    startButton.innerHTML = 'Start Game';
    startButton.addEventListener('click', () => {
        startGame();
    });
    section.appendChild(startButton);

    starsContainer = document.createElement('div');
    starsContainer.className = 'stars d-none';
    section.appendChild(starsContainer);

    audioRight = createAudio(null, "/audio/correct.mp3", starsContainer);
    audioWrong = createAudio(null, "/audio/error.mp3", starsContainer);
}

export function playAudio(id) {
    const audio = document.getElementById(`$audio_${id}`);
    audio.play();
}

export function toogleGame(game) {
    const cardHeader = document.querySelectorAll('.card-header, .btn-outline-info');
    if(game) {
        cardHeader.forEach((e) => {
            e.classList.add('d-none');
        })
        if (startButton) {
            startButton.classList.remove('d-none');
            starsContainer.classList.remove('d-none');
            section.style.marginBottom = '50px';
        }
    } else {
        cardHeader.forEach((e) => {
            e.classList.remove('d-none');
        })
        if (startButton) {
            startButton.classList.add('d-none');
            starsContainer.classList.add('d-none');
        }
    }
}

function cardLayout(word, classN, image, card, linkClick, id) {
    const div = document.createElement('div');
    div.style.backgroundImage = `url(${image})`;
    const header = document.createElement('div');
    header.className = 'card-header';
    div.className = classN;
    header.innerHTML = word;
    card.appendChild(div);
    div.appendChild(header);
    if(classN === 'front') {
        div.addEventListener('click', () => {
            linkClick(id)
        });
    }
}

export function proceedAnswer(right, id) {
    const img = document.createElement('img');
    if(right){
        img.src = '/img/star-win.svg';
        audioRight.play();
        const card = document.querySelector(`#card_${id}`);
        card.style.opacity = 0.5;
    } else {
        img.src = '/img/star.svg';
        audioWrong.play();
    }
    starsContainer.prepend(img);
}

export function changeButton() {
    startButton.innerHTML = '<img src="/img/repeat.svg">';
    startButton.classList.add('repeat');
}

export function gameOver(wrongAnswers) {
    clearCards();
    const div = document.createElement('div');
    div.className = 'fill';
    let audio;
    if(wrongAnswers > 0){
        div.style.backgroundImage = 'url("/img/failure.jpg")';
        div.innerHTML = `<h3>You loose</h3><p>Wrong answers: ${wrongAnswers}</p>`;
        audio = createAudio(null, "/audio/failure.mp3", div);
    } else {
        div.style.backgroundImage = 'url("/img/success.jpg")';
        div.innerHTML = `<h3>You win!</h3>`
        audio = createAudio(null, "/audio/success.mp3", div);
    }
    section.appendChild(div);
    audio.play();
}

export function resetGame() {
    if (startButton) {
        startButton.classList.remove('repeat');
        startButton.innerHTML = 'Start Game';
    }
    while (starsContainer && starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
    }
    const cards = document.querySelectorAll(".card, .mb-3");
    cards.forEach((e) => {
        e.style.opacity = 1;
    });
}


function createAudio(id, link, parent) {
    const audio = document.createElement('audio');
    if (id) {
        audio.id = `$audio_${id}`;
    }
    audio.innerHTML = `<source src="${link}" type="audio/mpeg">`;
    parent.appendChild(audio);
    return audio;
}

export function showError() {
    const div = document.createElement('div');
    // div.className = 'btn btn-primary btn-lg start_but d-none';
    div.innerHTML = 'There are no words in this set';
    section.appendChild(div);
}