
const mongoose = require("mongoose")

const connectdb = async (DB_name)=>{
    try {
        console.log(process.env.CONNECTION_STRING)
       const connect = await mongoose.connect(DB_name)
       console.log("Database Connected ", connect.connection.host, connect.connection.name)
    }
    catch (err){
        console.log(err,"Database Error");
        process.exit(1)
    }
}

module.exports = connectdb