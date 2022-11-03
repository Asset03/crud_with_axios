require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        //connection to mongo
        const con = await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB