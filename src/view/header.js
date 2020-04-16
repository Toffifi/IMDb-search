export function headerLinks(categories, linkClick) {
    const nav = document.querySelector('#navbar');
    categories.forEach((e) => {
        const link = document.createElement('li');
        link.className = 'nav-link';
        link.innerHTML = `${e}`;
        nav.appendChild(link);
        link.addEventListener('click', (event) => {
            linkClick(event)
        });
    })
    nav.children[0].classList.add('active'); //fix?
}