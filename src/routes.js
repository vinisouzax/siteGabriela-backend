const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const SubjectController = require('./controllers/SubjectController');
const ArticleController = require('./controllers/ArticleController');
const PdfController = require('./controllers/PdfController');
const ContentController = require('./controllers/ContentController');

const routes = express.Router();
const upload = multer(uploadConfig);

require('dotenv').config()
const jwt = require('jsonwebtoken');


routes.post('/sessions', SessionController.login);

routes.post('/users', UserController.store);

routes.get('/subjects', SubjectController.index);

routes.get('/contents', ContentController.index);

routes.get('/articles', ArticleController.index);
routes.get('/articles/:id', ArticleController.show);

routes.get('/pdfs/:id', PdfController.index);
routes.post('/pdfs/:id', PdfController.update);

routes.use(authenticateToken);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/subjects', SubjectController.store);
routes.get('/subjects/:id', SubjectController.show);
routes.put('/subjects/:id', SubjectController.update);
routes.delete('/subjects/:id', SubjectController.destroy);

routes.post('/contents', upload.single('image'), ContentController.store);
routes.get('/contents/:id', ContentController.show);
routes.put('/contents/:id', upload.single('image'), ContentController.update);
routes.delete('/contents/:id', ContentController.destroy);

routes.post('/articles', ArticleController.store);
routes.put('/articles/:id', ArticleController.update);
routes.delete('/articles/:id', ArticleController.destroy);

routes.post('/pdfs', upload.array('pdfs'), PdfController.store);
routes.delete('/pdfs/:id', PdfController.destroy);


function authenticateToken(req, res, nex){
    const token = req.headers['authorization'];

    if(token == null) 
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err)
            return res.sendStatus(403);
        
        req.user = user;

        nex()
    });
}

module.exports = routes;