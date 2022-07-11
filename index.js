const express = require("express");
var bodyParser = require('body-parser')
const connect = require("./config/db")
const app = express();
const cors = require('cors');
const router = require("./routes/userRoutes");
const playlistRoute = require("./routes/playlistRoute");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

//connect MongoDb data base
connect();


app.use(bodyParser.json());

// CORS used for transferring data from frontend to backend
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// CORS Middleware
app.use(cors(corsOptions));

app.use('/', router);
app.use('/', playlistRoute);

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});