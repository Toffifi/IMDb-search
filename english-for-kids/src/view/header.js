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
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    })
}

export function togglePlay(toogleClick) {
    const play = document.querySelector('#play_button');
    const train = document.querySelector('#train_button');
    play.addEventListener('click', () => toogleClick(true));
    train.addEventListener('click', () => toogleClick(false));
}