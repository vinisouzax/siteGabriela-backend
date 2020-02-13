const Subject = require('../models/Subject');

module.exports = {
    async store(req, res){
        const { name } = req.body;

        let subject = await Subject.findOne({ name });

        if(!subject){
            subject = await Subject.create({ name });
            return res.json({
                result: [{ 
                    subject 
                }], 
                message: true });
        }else{
            return res.json({ result: [], message: "This subject already exists!" });
        }
    },

    async index(req, res) {
        const subject = await Subject.find();

        let result = new Array();

        if(!subject){   
            return res.json({ 
                result, 
                message: "No Subjects" }); 
        }else{
            subject.forEach(function(i){
                result.push({
                    name: i.name, 
                    subject_id: i.id, 
                    active: i.active 
                });
            });

            return res.json({ 
                result, 
                message: true });
        }
    },

    async update(req, res) {
        const { id } = req.params, { name } = req.body;

        const subject = await Subject.updateOne({_id: id}, { name });

        if(!subject){
            return res.json({ 
                result: [], 
                message: "It was not possible the update!" });  
        }else{
            return res.json({ 
                result: [{
                    name,
                    subject_id: id 
                }], 
                message: true });          
        }
    },

    async show(req, res){
        const { id } = req.params;

        let subject = await Subject.findOne({ _id: id });

        if(!subject){
            return res.json({ result: [], message: "Subject does not exists!" });
        }else{

            return res.json({ 
                result: [{ 
                    name: subject.name, 
                    article_id: subject.id,
                    active: subject.active
                }], 
                message: true });
        }

    },

    async destroy(req, res) {

        const { id } = req.params;

        let subjectFind = await Subject.findOne({ _id: id });

        if(!subjectFind){
            return res.json({ result: [], message: "Subject does not exists!" });
        }else{
            const subject = await Subject.updateOne(
                { _id: id }, {active: !subjectFind.active});

            if(!subject){
                return res.json({ 
                    result: [], 
                    message: "It was not possible to delete this Subject!" });  

            }else{
                return res.json({ 
                    result: [{
                        subject
                    }], 
                    message: true });          
            }
        }

    }
}