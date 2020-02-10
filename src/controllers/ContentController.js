const Content = require('../models/Content');

module.exports = {
    async store(req, res){
        const { name, subject } = req.body;

        let filename = '';
        if(req.file)
            filename = req.file.filename;

        const content = await Content.create({
            name,
            subject,
            image: filename
        });

        if (!content) {
            return res.json({ 
                result: [], 
                message: "It was not possible to store this content!" });  
        }else{
            await content.populate('subject').execPopulate();

            return res.json({ 
                result: [{
                    name, 
                    subject_id: content.subject.id,
                    subject_name: content.subject.name,
                    image: content.image
                }], 
                message: true });          
        }
    },

    async index(req, res) {
        const content = await Content.find()
        .populate({ path: 'subject' }).exec();

        let result = new Array();

        if(!content){   
            return res.json({ 
                result, 
                message: "No contents" }); 
        }else{
            content.forEach(function(i){
                result.push({
                    name: i.name, 
                    content_id: i.id,
                    subject_id: i.subject.id,
                    subject_name: i.subject.name,
                    image_url: i.image_url,
                    active: i.active 
                });
            });

            return res.json({ 
                result, 
                message: true });
        }
    },

    async update(req, res) {
        const { id } = req.params, { name, subject } = req.body;
        let filename = '';
        if(req.file)
            filename = req.file.filename;

        let content = '';
        if(filename === '')
            content = await Content.updateOne({_id: id}, 
                {name, subject});
        else
            content = await Content.updateOne({_id: id}, 
                {name, subject, image: filename});

        if(!content){
            return res.json({ 
                result: [], 
                message: "It was not possible the update!" });  
        }else{
            return res.json({ 
                result: [{
                    name,
                    content_id: id,
                    subject
                }], 
                message: true });          
        }
    },

    async show(req, res){
        const { id } = req.params;

        let content = await Content.findOne({ _id: id });

        if(!content){
            return res.json({ result: [], message: "content does not exists!" });
        }else{
            await content.populate('subject').execPopulate();

            return res.json({ 
                result: [{ 
                    name: content.name,
                    image_url: content.image_url, 
                    content_id: content.id,
                    subject_id: content.subject.id,
                    subject_name: content.subject.name,
                    views: (content.views+1),
                    active: content.active
                }], 
                message: true });
        }

    },

    async destroy(req, res) {

        const { id } = req.params;

        let contentFind = await Content.findOne({ _id: id });

        if(!contentFind){
            return res.json({ result: [], message: "content does not exists!" });
        }else{
            const content = await Content.updateOne(
                { _id: id }, {active: !contentFind.active});

            if(!content){
                return res.json({ 
                    result: [], 
                    message: "It was not possible to delete this content!" });  
    
            }else{
                return res.json({ 
                    result: [{
                        content
                    }], 
                    message: true });          
            }
        }

    }
};