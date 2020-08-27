const express = require('express')
const app = express()
app.get('/api/info', (req, res) => {
    res.json({
        name: '开课吧',
        age: 5,
        msg: '1111111'
    })
})
app.listen('9092')