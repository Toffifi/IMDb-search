
const burger = document.querySelector('.burger');
const blur = document.querySelector('#blur');
const head = document.querySelector('.head');

export function createBurger(burgerClick) {
    burger.addEventListener('click', burgerClick);
    blur.addEventListener('click', burgerClick);
}

export function burgerStateChanged(burgerState) {
    if(burgerState){
        burger.classList.remove('burger-open');
        blur.classList.remove('blurOpen');
        head.classList.remove('bmOpen');
    } else {
        burger.classList.add('burger-open');
        blur.classList.add('blurOpen');
        head.classList.add('bmOpen');
    }
}

export function headerLinks(categories, linkClick) {
    const nav = document.querySelector('#navbar');
    categories.forEach((e) => {
        const id = `menuLink_${e.name.split(' ').join('_')}`
        let link = document.getElementById(id);
        if (!link) {
            link = document.createElement('li');
            link.id = id;
            link.className = 'nav-link';
            link.innerHTML = `${e.name}`;
            nav.appendChild(link);
            link.addEventListener('click', () => {
                linkClick(e.name);
            });
        }
        if (e.active) {
            link.classList.add('link-active');
        } else {
            link.classList.remove('link-active');
        }
    })
}

export function togglePlay(toogleClick) {
    const play = document.querySelector('#play_button');
    const train = document.querySelector('#train_button');
    play.addEventListener('click', () => toogleClick(true));
    train.addEventListener('click', () => toogleClick(false));
}

