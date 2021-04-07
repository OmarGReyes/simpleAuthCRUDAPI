const express = require('express')
const app = express();
const cors = require('cors')

require('./database');

app.set("port", process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api',require('./routes/index'))


app.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"));
  });
console.log('Server on port', 3000);