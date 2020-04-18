export function categoryCards(categories, linkClick) {
    const section = document.querySelector('section');
    const cards = document.createElement('div');
    cards.className = 'cards d-flex flex-auto flex-wrap justify-content-center';
    section.appendChild(cards);
    categories.forEach((e) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        cards.appendChild(card);
        const h3 = document.createElement('h3');
        h3.className = 'card-header';
        h3.innerHTML = `${e.name}`;
        card.appendChild(h3);
        const img = document.createElement('img');
        img.src = `${e.image}`;
        card.appendChild(img);
        card.addEventListener('click', () => linkClick(e.name))
    })
}