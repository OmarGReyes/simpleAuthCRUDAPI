const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/subscribers',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false

}).then(db => console.log('Database is connected'))
.catch(err => console.log(err))
