const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/subscribers',{
mongoose.connect('mongodb+srv://omargreyes:Coconutella10@cluster0.ahjr4.mongodb.net/subscribers',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false

}).then(db => console.log('Database is connected'))
.catch(err => console.log(err))
