const Pdf = require('../models/Pdf');
const fs = require('fs');

module.exports = {
    async store(req, res){
        const { article } = req.body;

        let pdfs = '';

        for(let i = 0; i < req.files.length; i++){
            pdf = await Pdf.create({
                name: req.files[i].filename,
                link: req.files[i].filename,
                article: article
            });
            pdfs += `${pdf.name};`;
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

    async index(req, res) {
        const { id } = req.params;
        const pdfs = await Pdf.find({ article: id })
        .populate({ path: 'article' }).exec();

        let result = new Array();
        if(!pdfs){   
            return res.json({ 
                result, 
                message: "No pdfs" }); 
        }else{
            pdfs.forEach(function(i){
                result.push({
                    name: i.name, 
                    pdf_url: i.pdf_url, 
                    pdf_id: i.id,
                    article_id: i.article.id,
                    active: i.active,
                    views: i.views,
                });
            });

            return res.json({ 
                result, 
                message: true });
        }
    },
    
    async update(req, res) {
        const { id } = req.params, { views } = req.body;

        const pdf = await Pdf.updateOne({_id: id}, {views});

        if(!pdf){
            return res.json({ 
                result: [], 
                message: "It was not possible the update!" });  
        }else{
            return res.json({ 
                result: [{
                    pdf_id: id,
                    views
                }], 
                message: true });          
        }
    },
    async destroy(req, res) {

        const { id } = req.params;

        const pdfFind = await Pdf.findOne({_id: id});

        const pdf = await Pdf.deleteOne({
            _id: id
        });

        if(!pdf){
            return res.json({ 
                result: [], 
                message: "It was not possible to delete this pdf!" });  

        }else{
            fs.unlinkSync(`${pdfFind.pdf_url}`)
            return res.json({ 
                result: [{
                    pdf
                }], 
                message: true });          
        }
    }
};