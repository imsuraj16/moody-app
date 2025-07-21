const mongoose = require('mongoose')




function connectDB(){

    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('DB connected');
        
    }).catch((err)=>{
        console.log('db not connected');
        console.log(err);
        
    })
}


module.exports = connectDB