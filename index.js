import express from "express"
import moment from "moment"
import bodyParser from "body-parser";

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('public'))

const d = moment()
const date = d.format('D/MM/YYYY')
var input = []

app.get('/', function (req, res) {
    res.render('index.ejs', {
        date: date,
        items: input
    })
})

app.post('/submit', function (req, res) {
    input.push(req.body.additem)
    res.render('index.ejs', {
        date: date,
        items: input
    })
})

app.post('/delete', function (req, res) {
    if (req.body.check) {
        for (let i = 0; i < input.length; i++)
            if (input[i] === req.body.check)
                input.splice(i, 1)
    }
    res.render('index.ejs', {
        date: date,
        items: input
    })
})

app.listen(port, function (err) {
    if (err) throw err
    console.log(`Server created on ${port}`)
})