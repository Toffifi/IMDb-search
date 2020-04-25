export default class View{
    constructor(data, getLevel){
        this.data = data;
        this.getLevel = getLevel;
    }
    
    init(){
        // console.log(this.data)
        // document.querySelector('.img').style.backgroundImage = `url('${this.data[0].image}')`;
        // document.querySelector('.word').innerHTML = this.data[0].translation;
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
                this.getLevel(e.id);
                // console.log(e.id, e)
            })
        })
    }
}