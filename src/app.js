'use sctrict'
const express = require('express')  
const cors = require('cors')
const app = express()
const helmet = require('helmet')
const router = require('./routes')
//require("./db.js");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/', router);
app.get('/', function(req, res){
    res.send("");
});
module.exports = app