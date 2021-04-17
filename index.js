require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// instaling app varaible & set inBuilt HTTP server from express package
const app = express();

//imports routes
const organizationRoute = require('./routes/organization');
const userRoute = require('./routes/user');

// custom middlewares 
app.use(bodyParser.json()); // to parse the json data
app.use(bodyParser.urlencoded({extended:false}));

// routers
app.use('/tagtalk',organizationRoute);
app.use('/tagtalk',userRoute);
// port info
const Port = process.env.Port || 4400;
app.listen(Port,()=>{
    console.log(`port serving on :${Port}`);
})

// database connection through mongoose
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connected to Database(mongodb)`);
})