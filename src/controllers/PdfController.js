const Pdf = require('../models/Pdf');

module.exports = {
    async store(req, res){
        const { subject } = req.body;

        let pdfs = '';

        for(let i = 0; i < req.files.length; i++){
            pdf = await Pdf.create({
                title: req.files[i].filename,
                link: req.files[i].filename,
                subject: subject
            });
            pdfs += `${pdf.title};`;
        }

        if (!pdf) {
            return res.json({ 
                result: [], 
                message: "It was not possible to store this pdf!" });  
        }else{

            return res.json({ 
                result: [{
                    pdfs 
                }], 
                message: true });          
        }
    },

    /*async index(req, res) {
        const { subject } = req.body;
        const article = await Article.find({ subject });

        let result = new Array();

        if(!article){   
            return res.json({ 
                result, 
                message: "No articles" }); 
        }else{
            article.forEach(function(i){
                result.push({
                    title: i.title, 
                    txt_dsc: i.txt_dsc, 
                    article_id: i.id,
                    subject,
                    active: i.active 
                });
            });

            return res.json({ 
                result, 
                message: true });
        }
    },

    async update(req, res) {
        const { id } = req.params, { title, txt_dsc, subject } = req.body;

        const article = await Article.updateOne({_id: id}, {title, txt_dsc, subject});

        if(!article){
            return res.json({ 
                result: [], 
                message: "It was not possible the update!" });  
        }else{
            return res.json({ 
                result: [{
                    title,
                    txt_dsc,
                    article_id: id,
                    subject
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
            await article.populate('subject').execPopulate();

            return res.json({ 
                result: [{ 
                    title: article.title, 
                    txt_dsc: article.txt_dsc,
                    article_id: article.id,
                    subject_id: article.subject.id,
                    subject_name: article.subject.name,
                    views: (article.views+1),
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

    }*/
};