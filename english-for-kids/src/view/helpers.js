export function clearCards() {
    const container = document.querySelector('.cards');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }       
}