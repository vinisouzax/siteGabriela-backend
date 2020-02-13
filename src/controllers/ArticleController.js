const Article = require('../models/Article');

module.exports = {
    async store(req, res){
        const { name, subject, content } = req.body;

        const article = await Article.create({
            name,
            subject,
            content
        });

        if (!article) {
            return res.json({ 
                result: [], 
                message: "It was not possible to store this article!" });  
        }else{
            await article.populate('subject').populate('content').execPopulate();

            return res.json({ 
                result: [{
                    name, 
                    article_id: article.id,
                    subject_id: article.subject.id,
                    subject_name: article.subject.name,
                    content_id: article.content.id,
                    content_name: article.content.name
                }], 
                message: true });          
        }
    },

    async index(req, res) {
        const article = await Article.find()
        .populate({ path: 'subject' }).populate({ path: 'content' }).exec();

        let result = new Array();

        if(!article){   
            return res.json({ 
                result, 
                message: "No articles" }); 
        }else{
            article.forEach(function(i){
                result.push({
                    name: i.name, 
                    article_id: i.id,
                    subject_id: i.subject.id,
                    subject_name: i.subject.name,
                    content_id: i.content.id,
                    content_name: i.content.name,
                    active: i.active 
                });
            });

            return res.json({ 
                result, 
                message: true });
        }
    },

    async update(req, res) {
        const { id } = req.params, { name, subject, content } = req.body;

        const article = await Article.updateOne(
            {_id: id}, {name, subject, content});

        if(!article){
            return res.json({ 
                result: [], 
                message: "It was not possible the update!" });  
        }else{
            return res.json({ 
                result: [{
                    name,
                    article_id: id,
                    subject,
                    content
                }], 
                message: true });          
        }
    },

    async show(req, res){
        const { id } = req.params;

        let article = await Article.findOne({ _id: id });

        if(!article){
            return res.json({ result: [], message: "article does not exists!" });
        }else{
            await article.populate('subject').populate('content').execPopulate();

            return res.json({ 
                result: [{ 
                    name: article.name, 
                    article_id: article.id,
                    subject_id: article.subject.id,
                    subject_name: article.subject.name,
                    content_id: article.content.id,
                    content_name: article.content.name,
                    active: article.active
                }], 
                message: true });
        }

    },

    async destroy(req, res) {

        const { id } = req.params;

        let articleFind = await Article.findOne({ _id: id });

        if(!articleFind){
            return res.json({ result: [], message: "article does not exists!" });
        }else{
            const article = await Article.updateOne(
                { _id: id }, {active: !articleFind.active});

            if(!article){
                return res.json({ 
                    result: [], 
                    message: "It was not possible to delete this article!" });  
    
            }else{
                return res.json({ 
                    result: [{
                        article
                    }], 
                    message: true });          
            }
        }

    }
};