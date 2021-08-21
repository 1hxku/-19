// Если не сокращу эти функции - Заебусь при дебаге
const s = selector => document.querySelector(selector)
const l = console.log

// 2 Серии чек-боксов для проверки заполненности формы
const Rooms = new List('#roomsCount > .card-body')
const PaymentMethods = new List('#paymentMethods > .card-body')
const SearchBtn = s('#searchBtn')

// Заселектил Форму, Текст над Формой, 
const Form = s('#searhForm')
const FormTitle = s('#searchTitle')

SearchBtn.onclick = async () => {
    if(!Rooms.has_checked || !PaymentMethods.has_checked) return

    Form.setAttribute('hidden', '')

    FormTitle.innerText = ''
    FormTitle.innerHTML = '<div class="spinner-grow mx-1" role="status"></div>'
    
    await new Promise(res => setTimeout(res, 4e3 + 1e3 * Math.random()))

    // Генерирую случайное число от 0 до 1, потом умножаю на 100 чтоб целая часть была меньше 100 и округляю
    let n = Math.floor(Math.random()*100) 

    // Если число меньше 10 получилось то умножаю на 10 и добавляю случайное число в разряд единиц
    if(n < 10) n = n * 10 + Math.floor(Math.random()*10) 

    // Если число больше 80 - 60 + случайное число
    if(n > 80) n = 60 + Math.floor(Math.random()*10) 
    // Последняя цифра числа
    let lst = Number(String(n)[1])

    // Заебись, придумал алгоритм который по последней цифре числа пишет правильное окончание у слов, а то пиздец "найден 82 крартир"
    FormTitle.innerText = `По Вашему Запросу Найден${lst == 1 ? 'a' : 'о'} ${n} Квартир${!lst || n < 21 || (lst > 4 & n > 21) ? '' : lst == 1 ? 'a' : 'ы'}.\nЗаполните Форму, чтобы узнать больше.`
    
    // Проявляю Форму
    Form.removeAttribute('hidden')
}

// Заселектил поле ввода имени, телефона и кнопку отправки в конечной форме
const name_ = s('#name')
const phone = s('#phone')
const SendButton = s('#send')

// Каждый раз при Изменении одного из полей - телефона или имени - будет проводиться проверка на наличие данных во всей форме 
// Если форма вся заполнена - то будет доступна кнопка отправки
name_.onchange = try_switch_button_state
phone.onchange = try_switch_button_state

function try_switch_button_state(){
    name_.value.length > 0 // Если поле имени заполнено
    & phone.value.length > 0 // и поле тефона заполнено
    & Rooms.has_checked // и блок кол-ва комнат имеет хотя бы один заполненный чекбокс
    & PaymentMethods.has_checked // и блок способа оплаты имеет хотя бы один заполненный чекбокс

    // Тогда убираем аттрибут "disabled" с кнопки делающий ее недоступной, 
    // иначе делаем ее заного недоступной добавлением аттрибута "disabled"
    ? SendButton.removeAttribute('disabled') : SendButton.setAttribute('disabled', '') 
}

// "Отправить" + *клик* -> Отправка данных на сервер
SendButton.onclick = async () => {
    const name = s('#name')
    const phone = s('#phone')

    await fetch(
        `http://localhost:3000/`
        + `callback?rooms=${encodeURI(Rooms.buffer.join(', '))}`
        + `&payment_methods=${encodeURI(PaymentMethods.buffer.join(', '))}`
        + `&name=${encodeURI(name.value)}`
        + `&phone=${encodeURI(phone.value)}`
    )

    // Перезагрузка страницы чтоб какие-нибудь додики не дебажили ее
    location.reload() 
}
