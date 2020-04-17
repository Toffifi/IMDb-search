export function categoryCards(categories) {
    const section = document.querySelector('.cards');
    categories.forEach((e) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        section.appendChild(card);
        const h3 = document.createElement('h3');
        h3.className = 'card-header';
        h3.innerHTML = `${e.name}`;
        card.appendChild(h3);
        const img = document.createElement('img');
        img.src = `${e.image}`;
        card.appendChild(img);
    })
}