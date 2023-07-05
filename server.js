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
app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log(`Listening on port ${process.env.PORT}`)
})