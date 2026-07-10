require('dotenv').config();
const dns = require('dns');
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const app = require('./src/app')
const connectDB = require('./src/config/database');
const redis = require('./src/config/cache')


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})

