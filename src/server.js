const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb://siteGabriela:k1BI1eCxNwH06JAk@sitegabriela-shard-00-00-zfcux.mongodb.net:27017,sitegabriela-shard-00-01-zfcux.mongodb.net:27017,sitegabriela-shard-00-02-zfcux.mongodb.net:27017/test?ssl=true&replicaSet=siteGabriela-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//GET, POST, PUT, DELETE
//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '../', 'uploads')));
app.use(routes);

app.listen(3333);