 const User = require('../models/User')
 const jwt = require('jsonwebtoken')

 export const logIn =  async(req,res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(!user) return res.status(401).send('The email doesn´t exist')
    if(password !== user.password) return res.status(401).send('Wrong password');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token})
}

export const signUp = async(req,res)=>{
     
    const {username, password} = req.body;
    const newUser = new User({username,password});
    await newUser.save()

    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(200).json({token})
 }
