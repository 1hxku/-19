const express = require('express')
const fetch = require('node-fetch')
const {port, bot} = require('./config')
const l = console.log
const telegram_bot_url = 'https://api.telegram.org/bot' + bot.api_key

// Создание Сервера
const app = express()

// Установка pug Шаблонизатора
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('./dist'))

// Маршрутизация
app.get('/', function(req, res){
    res.render('index')
})

app.get('/callback', async function(req, res){
    let a = req.query
    let msg 
        = `🏢 Кол-во Комнат: ${a.rooms}\n`
        + `💵 Бюджет: ${a.budget}\n`
        + `💳 Способы Оплаты: ${a.payment_methods}\n`
        + `_______________________\n`
        + `🏷 Имя: ${a.name}\n`
        + `📞 Телефон: ${a.phone}`
    await fetch(telegram_bot_url+`/SendMessage?chat_id=${bot.callback_chat_id}&text=${encodeURI(msg)}`)
})

// Запуск Сервера
app.listen(port, () => {
    l(
        'Example app listening at ' 
        + (port == 80 ? 'http://localhost' : `http://localhost:${port}`)
    )
})