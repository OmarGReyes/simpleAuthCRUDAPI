 const {Router} = require('express')
 const User = require('../models/User')
 const Subscriber = require('../models/Subscriber')
 const jwt = require('jsonwebtoken')


 const router = Router();

 router.get('/', (req,res)=> res.send('Hello world'))

 router.post('/signup', async(req,res)=>{
     
    const {username, password} = req.body;
    const newUser = new User({username,password});
    await newUser.save()

    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(200).json({token})
 })

 router.post('/account/login', async(req,res)=>{
     const {username, password} = req.body;
     const user = await User.findOne({username})
     if(!user) return res.status(401).send('The email doesn´t exist')
     if(password !== user.password) return res.status(401).send('Wrong password');

     const token = jwt.sign({_id: user._id}, 'secretKey');
     return res.status(200).json({token})


 })

 router.get('/subscribers', verifyToken, async(req,res)=>{
     const subscribers = await Subscriber.find()
     const count = await Subscriber.count()

     res.json({"Count": count, "Data": subscribers})
 })

 router.get('/subscribers/:id', async (req,res)=>{
     let elId = req.params.id
     const suscriptor = await Subscriber.find({Id: elId})
     res.json(suscriptor)
 })

 router.post('/subscribers', async(req,res)=>{
    
    const {Name, Email, CountryCode, CountryName, PhoneCode, PhoneNumber, JobTitle,Area, Topics} = req.body;
    const newSubscriber = new Subscriber({Name, Email, CountryCode, CountryName, PhoneCode, PhoneNumber, JobTitle,Area, Topics});
    if(!Name){
        return res.send('Debe ingresar por lo menos el nombre y el correo electrónico')
    }else if(!Email && (!CountryCode || !PhoneNumber)){
        return res.send('Se debe enviar o el correo electrónico +o el numero de teléfono y el código del país')
    }
    console.log(newSubscriber);
    await newSubscriber.save()

    
    res.status(200).json('New subscriber created')
     
 })

 router.put('/subscribers/:id', async(req,res)=>{
    let elId = req.params.id
    const {Name, Email, CountryCode, CountryName, PhoneCode, PhoneNumber, JobTitle,Area, Topics} = req.body;
    await Subscriber.findOneAndUpdate({Id:elId}, {Name, Email, CountryCode, CountryName, PhoneCode, PhoneNumber, JobTitle,Area, Topics})
    res.status(200).json('User modified')
    
    
 })



 module.exports = router;

 function verifyToken(req,res,next){
     if (!req.headers.authorization){
         return res.status(401).send('Unautorizhed request')
     }

     const token = req.headers.authorization.split(' ')[1]
     const bearer = req.headers.authorization.split(' ')[0]

     if(token ==='null'){
        return res.status(401).send('Unautorizhed request')
     }
     const payload = jwt.verify(token, 'secretKey')
     console.log(bearer);
     console.log(payload);
     next()
 }
