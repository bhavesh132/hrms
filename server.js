const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()

const connectDB = () => {
    mongoose.connect(process.env.URI, {
        ssl: true
    })
    console.log("connected to DB")
} 

// Connect Express Server
const server = app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log(`Listening on port ${process.env.PORT}`)
})


// Unhadled Promise Rejection?
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server!")

    server.close(()=>{
        process.exit(1);
    })
})