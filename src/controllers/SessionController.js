//index, show, store, update, destroy
require('dotenv').config();

const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res){
        const { email, password } = req.body;

        let user = await User.findOne({ email, password, active: true });
        let accessToken = '';

        if(!user){
            return res.json({ result: [], message: "User does not exists!" });
        }else{
            /*accessToken = jwt.sign({user_id: user.id, 
                name: user.name, 
                permission: user.permission.tipo}, process.env.ACCESS_TOKEN_SECRET);*/
            accessToken = jwt.sign({user_id: user.id, 
                name: user.name, 
                permission: user.permission}, process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '24h'});
            return res.json({ 
                result: [{ 
                    accessToken
                }], 
                message: true });
        }
    }
};