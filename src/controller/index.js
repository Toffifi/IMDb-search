import { headerLinks } from '../view/header';
// import { categoryCards } from '../view/mainHome';

let curPage = 'Home';

async function getData() {
    let response = await fetch("/data.json");
    const answer =  await response.json();
    return answer;
}

export async function getCategories() {
    const data = await getData();
    const categories = data.map((el) => ({ name: el.name, image: el.cards[0].image}));
    return categories;
}

export function linkClick(event) {
    Array.from(event.target.parentNode.children).forEach((e) => {
        e.classList.remove('active');
    })
    event.target.classList.add('active');
    setPage(event.target.textContent);
}


function setPage(value) {
    curPage = value;
    updatePage(curPage);
}


export async function initialize() {
    const categories = await getCategories();
    const names = [];
    categories.forEach(e => names.push(e.name));
    names.unshift('Home');
    headerLinks(names, linkClick);
    // updatePage(curPage, categories)
}

function updatePage(page) {
    if(page === 'Home'){
        // categoryCards(cards);
    } else {
        var container = document.querySelector('.cards');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}
