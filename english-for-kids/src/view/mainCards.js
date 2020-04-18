export function cards(arr, linkClick) {
    const section = document.querySelector('section');
    const cards = document.createElement('div');
    cards.className = 'cards d-flex flex-auto flex-wrap justify-content-center';
    section.appendChild(cards);
    arr.forEach((e) => {
        const container = document.createElement('div');
        container.className = 'cards_container';
        const card = document.createElement('div');
        card.className = 'card mb-3';
        cards.appendChild(container);
        container.appendChild(card);

        cardLayout(e.word, 'front', e.image, card, linkClick, e.id);
        cardLayout(e.translation, 'back', e.image, card);
        
        const button = document.createElement('button');
        button.innerHTML = 'ok';
        card.appendChild(button);
        button.className = 'btn btn-outline-info';
        button.addEventListener('click', () => {
            container.classList.add('hover');
            card.style.transform = 'rotateY(180deg)';
        });
        container.addEventListener('mouseleave', () => {
            container.classList.remove('hover');
            card.style.transform = '';
        });

        const audio = document.createElement('audio');
        audio.id = `$audio_${e.id}`;
        audio.innerHTML = `<source src="${e.audioSrc}" type="audio/mpeg">`;
        container.appendChild(audio);
    })
    const start = document.createElement('div');
    start.className = 'btn btn-primary btn-lg d-none';
    start.id = 'start_but'
    start.innerHTML = 'Start Game';
    section.appendChild(start);
}

export function playAudio(id) {
    const audio = document.getElementById(`$audio_${id}`);
    audio.play();
}

export function toogleGame(game) {
    const cardHeader = document.querySelectorAll('.card-header, .btn-outline-info');
    const startButton = document.querySelector('#start_but');
    if(game) {
        cardHeader.forEach((e) => {
            e.classList.add('d-none');
        })
        if(startButton){
            startButton.classList.remove('d-none');
        }
        
    } else {
        cardHeader.forEach((e) => {
            e.classList.remove('d-none');
        })
        if(startButton){
            startButton.classList.add('d-none');
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