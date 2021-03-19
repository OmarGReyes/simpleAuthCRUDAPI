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
    let {page =1, count=5, criteria,sortOrder, sortType } = req.query;
    
    
    if(sortOrder && !criteria){
        return res.json('Por favor indique un filtro de busqueda')
    }else if(criteria && !sortOrder){
        return res.json('Por favor indique un campo para filtrar')
    }
    // criteria = String(criteria)

    let searchType = 'asc';
    if (sortType){
        if(sortType ===0){
            searchType = 'asc'
        }else if(sortType==1){
            searchType = 'desc'
        }
    }
    
    let subscribers = '';
    if(sortOrder && criteria){  
        let queryParam = {}
        let sortParam = {}
        queryParam[sortOrder]= criteria;
        sortParam[sortOrder]= searchType;
        subscribers = await Subscriber.find(queryParam).sort(sortParam).limit(count*1).skip((page-1)*count);
    } else{
        subscribers = await Subscriber.find().sort({sortOrder: searchType}).limit(count*1).skip((page-1)*count);
    }

    // const subscribers = await Subscriber.find().sort({sortOrder: searchType}).limit(count*1).skip((page-1)*count);
    // const cantity = await Subscriber.count().limit(count*1).skip((page-1)*count)
    cantity = subscribers.length

     res.json({"criteria": criteria,"sortType": sortType,"sortOrder": sortOrder,"sortType": searchType,"Count": cantity, "Data": subscribers})
 })

 router.get('/subscribers/:id', async (req,res)=>{
     let elId = req.params.id
     const suscriptor = await Subscriber.find({"Id": elId})
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
    //  console.log(bearer);
    //  console.log(payload);
     next()
 }
