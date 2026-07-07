require('dotenv').config();
const dns = require('dns');
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const app = require('./src/app')
const connectDB = require('./src/config/database');
const redis = require('./src/config/cache')


connectDB();


app.listen("3000",()=> {
    console.log("port is running on 3000");
})

