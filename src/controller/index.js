import { headerLinks } from '../view/header';

let curPage = 'Home';

async function getData() {
    let response = await fetch("/data.json");
    const answer =  await response.json();
    return answer;
}

export async function getCategories() {
    const data = await getData();
    const categories = [];
    data.forEach((e) => {
        categories.push(e.name);
    })
    return categories;
}

export function linkClick(event) {
    Array.from(event.target.parentNode.children).forEach((e) => {
        e.classList.remove('active');
    })
    event.target.classList.add('active');
    curPage = event.target.textContent;
    console.log(curPage);
}

export async function initialize() {
    const categories = await getCategories();
    categories.unshift('Home');
    headerLinks(categories, linkClick);
}
