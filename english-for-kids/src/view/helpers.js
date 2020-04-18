export function clearCards() {
    const container = document.querySelector('section');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}