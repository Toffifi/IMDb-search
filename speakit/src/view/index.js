export default class View{
    constructor(data){
        this.data = data;
    }
    
    init(){
        // console.log(this.data)
        // document.querySelector('main').style.backgroundImage = `url('${this.data[0].image}')`;
        // document.querySelector('main').innerHTML = this.data[0].translation;
        this.headerButton()
    }

    headerButton() {
        const buttons = document.querySelectorAll('.level-btn');
        buttons.forEach((e) => {
            e.addEventListener('click', (event) => {
                buttons.forEach((i) => {
                    i.classList.remove('active');
                })
                event.target.classList.add('active');
            })
        })
    }
}