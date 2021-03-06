const mongoose = require ('mongoose');

const conectar = async () =>{
    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Success connect')
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports = conectar;