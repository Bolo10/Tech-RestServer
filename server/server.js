require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
    // parse applicaction/
app.use(bodyParser.urlencoded({ extended: false }))
    // parse aplicationjson
app.use(bodyParser.json())
app.use(require('./routes/impresora'))

//mongoose.connect('mongodb://localhost:27017/techAdmin', {
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err
    console.log("Base de datos online");
})

app.listen(process.env.PORT, () => {
    console.log("escuchando el puerto ", process.env.PORT);
})