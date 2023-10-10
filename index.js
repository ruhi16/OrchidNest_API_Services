const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./utils/database');
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res)=>{
    res.send({
        status: 200, 
        message: "OrchidNest: This is Root Page."
    });
});




const authRoute = require("./routes/auth.route");
app.use('/api/v1/users', authRoute);






//Log message at console
app.use(morgan('tiny'));    //tiny, combined, dev












// Any root, not matched, "const createError = require('http-errors');"
app.use((next)=>{
    next(createError.NotFound('Page not found!'));
});


// It will be Hitted, whenever next() arrive with an 'error' object. It will use first argument as err
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});



// Listening port at server end
const PORT = process.env.PORT || 4500;
app.listen(PORT, ()=>{
    console.log(`I am listening from port no ${PORT}`);
});