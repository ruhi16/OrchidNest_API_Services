const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//const config = require('config');
//mongodbUri = "mongodb+srv://ruhi16:asdf1234@cluster0.yaizg.mongodb.net/digidurgapuja";  //production
mongodbUri = process.env.MONGODB_URI  //development
//mongodbUri = "mongodb://localhost:27017/digidurgapuja";  //development localhost

//mongodbUri = config.get('dbconn.mongodbURI');

console.log(mongodbUri);

const connectDb = async ()=>{
    try{
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch(err){
        console.log(err.message);
    }
};

//set the strictQuery option to true globally to suppress the warning
//mongoose.set('strictQuery', true);

//set the flag to false if you want to override the current stringQuery behavior and prepare fot the new release
mongoose.set('strictQuery', false);


mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db....');
});

mongoose.connection.on('error', (error)=>{
    console.log('Mongoose connection errors....' + error.message);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected from db....');
});

process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0);
});



module.exports = connectDb;
