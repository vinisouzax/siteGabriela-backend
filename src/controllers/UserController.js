
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email, password, name, permission } = req.body;
        
        let user = await User.findOne({ email });

        if (!user) {

            user = await User.create({
                email,
                password,
                name,
                permission
            })

            return res.json({ 
                result: [{
                    name, 
                    user_id: user.id,
                    permission: user.permission
                }], 
                message: true });

        }else{
            return res.json({ 
                result: [], 
                message: "User already exists!" });            
        }
    },

    async index(req, res) {
        const user = await User.find();

        let result = new Array();

        if(!user){  
            return res.json({ 
                result, 
                message: "No users" });  
        }else{
            user.forEach(function(i){
                result.push({
                    name: i.name, 
                    user_id: i.id, 
                    active: i.active 
                });
            });

            return res.json({ 
                result, 
                message: true });
        }
    },

    async update(req, res) {
        const { id } = req.params, { password, name, email, permission } = req.body;

        const user = await User.updateOne({_id: id},{ password, name, email, permission });

        if(!user){
            return res.json({ 
                result: [], 
                message: "It was not possible the update!" });  
        }else{
            return res.json({ 
                result: [{
                    user
                }], 
                message: true });          
        }
    },

    async show(req, res){
        const { id } = req.params;

        let user = await User.findOne({ _id: id });

        if(!user){
            return res.json({ result: [], message: "User does not exists!" });
        }else{
            return res.json({ 
                result: [{ 
                    name: user.name, 
                    email: user.email,
                    cpf_cnpj: user.cpf_cnpj, 
                    phone: user.phone, 
                    user_id: user.id,
                    permission: user.permission,
                    active: user.active
                }], 
                message: true });
        }

    },

    async destroy(req, res) {

        const { id } = req.params;

        const date = new Date(); 

        const user = await User.updateOne({_id: id}, { dt_remove: date, active: false });

        if(!user){
            return res.json({ 
                result: [], 
                message: "It was not possible to delete this user!" });  

        }else{
            return res.json({ 
                result: [{
                    user
                }], 
                message: true });          
        }

        /*const user = await User.deleteOne({
            _id: id
        });

        return res.json({ message: dev });*/
    }
};