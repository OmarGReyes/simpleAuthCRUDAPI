 const {Router} = require('express') 
 const Subscriber = require('../controllers/subscriber.controller')
 const User = require('../controllers/user.controller')
 const middleware = require('../middlewares/authjwt')
 const router = Router();




 router.get('/', (req,res)=> res.send('Hello world'))

 router.post('/account/signup', User.signUp)

 router.post('/account/login',User.logIn)

 //<-----------Subscribers-------->

 router.get('/subscribers', middleware.verifyToken, Subscriber.getSubscribers)

 router.get('/subscribers/:id',middleware.verifyToken ,Subscriber.getSubscriber)

 router.post('/subscribers', middleware.verifyToken, Subscriber.createSubscriber)

 router.put('/subscribers/:id', middleware.verifyToken, Subscriber.modifySubscriber)

 router.delete('/subscribers/:id', middleware.verifyToken, Subscriber.deleteSubscriber)




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
