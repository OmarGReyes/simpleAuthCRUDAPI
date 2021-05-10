const jwt = require('jsonwebtoken')

export const verifyToken= (req,res,next)=>{
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