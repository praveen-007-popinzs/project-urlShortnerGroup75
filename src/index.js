const express = require('express');
var bodyParser = require('body-parser');
const multer=require('multer')

const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://shrati:65FywNUvGdDH49SQ@cluster0.tpfb4.mongodb.net/group75-Database", 
    {useNewUrlParser: true,useUnifiedTopology: true,  useCreateIndex: true}
)
    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


