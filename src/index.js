const express = require('express')
const app = express();
const cors = require('cors')

require('./database');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api',require('./routes/index'))


app.listen(3000);
console.log('Server on port', 3000);