const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//GET, POST, PUT, DELETE
//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors({ origin: process.env.APP_URL }, { origin: process.env.APP_URL2 }));
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '../', 'uploads')));
app.use(routes);

app.listen(process.env.PORT || 3333);