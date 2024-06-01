const mongoose = require('mongoose')


const ConnectMongoDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('server running succesfully')
    }catch(err){
        console.log("internel db error" + err)
    }
}

module.exports = {
    ConnectMongoDb
}