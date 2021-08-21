class List{
    constructor(seletor){
        this.element = document.querySelector(seletor)
        this.element.onclick = this.fill_up_buffer.bind(this)

        this.buffer = []
        this.has_checked = false

        this.prepare()

        
    }
    fill_up_buffer(){
        let button = this.element.querySelector('button')

        let rows = this.element.querySelectorAll('label.btn')
        this.buffer = []
        this.has_checked = false
        
        for(let i of rows){
            let input = i.querySelector('input')

            if(!input.checked) continue

            this.has_checked = true

            this.buffer.push(
                i.innerText
            )
        }
        this.has_checked ? button.removeAttribute('disabled') : button.setAttribute('disabled', '')
        
        return this.buffer
    }
    prepare(){
        function toggle_state(e){
            let input = e.querySelector('input')
            input.checked ? e.classList.remove('active') : e.classList.add('active')
            input.checked = !input.checked
        }
        let rows = this.element.querySelectorAll('label.btn')
        for(let i of rows){
            i.onclick = () => toggle_state(i)
        }
        
    }
}