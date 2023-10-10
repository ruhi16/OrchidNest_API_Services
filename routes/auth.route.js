const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const nodemailer = require('nodemailer');

const User = require('../models/user.model');

const { signAccessToken, signRefreshToken, verifyAccessToken } = require('../utils/jwt_actions');
const { registerSchema, updateSchema, deleteSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../utils/validaton_schema');


const {sendEmail, sendEmailForForgotPassword} = require('../utils/email_actions');



function makeRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



// /api/users
// router.get('/', (req, res)=>{
//     res.send({
//         status: 200, 
//         message: "This is Auth User"
//     });
// });



// Check whether the user logged in(with access token), is verified with email id or not
const { isVerifiedEmailUrl } = require('../utils/email_actions');
router.get('/is_verify_email_url', verifyAccessToken, isVerifiedEmailUrl, (req, res, next) => {

    res.send({
        status: 200,
        message: 'email verified successfully.'
    })
});



// Verify email id with without access token, from email link, by its self
router.get('/self/:verify_url', async(req, res, next)=>{

    try{
        const user = await User.findOne({verify_url: req.params.verify_url});

        // console.log('verify_email:' + user.email);
        if(!user){
            throw createError.Conflict(`This link of url has been verified or expired.`);
        }
         
        user.verify_url = '';
        user.is_url_verified = true;
        user.save();
        

        res.send({
            status: 200,
            message: 'email verified successfully'              
        });


    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        console.log(error.message);
        next(error);        
    }
});



// Verify email id with access token
router.get('/all/:verify_url', verifyAccessToken, async(req, res, next) => {

    console.log("oke")
    try{
        const user = await User.findById(req.payload.aud);
        console.log('verify_email:' + user.email);
        if(!user){
            throw createError.Conflict(`This user email '${user.email}' not exists.`);
        }
         
        var message = '';

        if(req.params.verify_url === user.verify_url){
            user.verify_url = '';
            user.is_url_verified = true;
            // await user.save();

            message = 'user email link verified successffully';                
        }else{

            message = 'user email link not verified.';                           
        }
        

        res.send({
            status: 200,
            message: message              
        });


    }catch(error){
        // if(error.isJoi === true){
        //     error.status = 422;
        // }
        next(error);        
    }
});




router.post('/register', async (req, res, next) => {  
    console.log(req.body);
    try{
        // validation by Joi
        const result = await registerSchema.validateAsync(req.body);
        console.log('after validated by joi: ',result);

        const doesExist = await User.findOne({email: result.email});
        
        if(doesExist){
            throw createError.Conflict(`This email '${result.email}' has been already taken.`);
        }
        

        const user = new User(result);
        // console.log(user._id.toString());
        user.access_token = await signAccessToken(user._id.toString());
        user.refresh_token = await signRefreshToken(user._id.toString());        
        
        user.verify_url = makeRandomString(20);
        user.verify_otp = Math.floor(1000 + Math.random() * 9000);

        const savedUser = await user.save();


        // Email Send options
        //sendEmail(savedUser._id);

        

        res.send({
            user: savedUser,
            payload: 'dxysk',
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);        
    }
});



router.post('/login', async (req, res, next) => {
    try{
        //console.log(req.body);
        const result = await loginSchema.validateAsync(req.body);
        // console.log(result);
        const user = await User.findOne({email: result.email});
        if(!user){
            throw createError.Conflict(`This user '${result.email}' not registered.`);
        }
        user.access_token = await signAccessToken(user._id.toString());
        user.refresh_token = await signRefreshToken(user._id.toString());

        const savedUser = await user.save()

        res.send({
            user: savedUser,
            payload: req.payload,
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);
    }
});



router.get('/logout', verifyAccessToken, async (req, res, next) => {
    try{
        //console.log(req.body);
        //const result = await loginSchema.validateAsync(req.body);
        // console.log(result);
        //const user = await User.findOne({email: result.email});
        // if(!user){
        //     throw createError.Conflict(`This user '${result.email}' not registered.`);
        // }
        console.log('user:', req.payload.aud);
        const user = await User.findOne({_id: req.payload.aud});

        user.access_token = null; //await signAccessToken(user._id.toString());
        user.refresh_token = null; //await signRefreshToken(user._id.toString());

        const savedUser = await user.save()

        console.log(req.payload);

        res.send({
            user: savedUser,
            payload: req.payload,
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);
    }
});




router.post('/forgot_password', async (req, res, next) => {
    try{
        // console.log(req.body);
        // const user = await User.findOne({verify_url: req.params.verify_url});
        const result = await forgotPasswordSchema.validateAsync(req.body);

        // console.log(result);
        const user = await User.findOne({email: result.email});
        if(!user){
            throw createError.Conflict(`This email '${result.email}' is not registered.`);
        }            
        
        user.verify_url = makeRandomString(20);
        const savedUser = await user.save();

        // Email Send options
        sendEmailForForgotPassword(savedUser._id); 

        res.send({
            // user: savedUser,
            status: 200,
            reset_password_id: user.verify_url,
            message: 'Reset password link has been sent to your registered email, please check your inbox.',
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);
    }
});



router.post('/reset_password', async (req, res, next) => {
    try{
        // console.log(req.body);
        // const user = await User.findOne({verify_url: req.params.verify_url});
        const result = await resetPasswordSchema.validateAsync(req.body);

        // console.log(result);
        const user = await User.findOne({verify_url: result.reset_password_id});
        if(!user){
            throw createError.Conflict(`This email '${result.email}' or reset_password_id is not registered.`);
        }            
        
        user.verify_url = '';
        const savedUser = await user.save();

        res.send({            
            status: 200,
            message: 'Password has been changed successfully, now you can login.',
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);
    }
});



router.put('/update', verifyAccessToken, async (req, res, next) => {
    try{
        // validation by Joi
        const result = await updateSchema.validateAsync(req.body);
        // The default is to return the original, unaltered document. 
        // If you want the new, updated document to be returned 
        // you have to pass an additional argument: an object 
        // with the new property set to true.
        const updatedUser = await User.findOneAndUpdate({_id: result._id}, result, {new: true})
                .select({ "firstname": 1, "lastname": 1, "email": 1 });
        // console.log(updatedUser);
        if(!updatedUser){
            throw createError.Conflict(`This user '${result.email}' does not exists.`);
        }        
        res.send({
            user: updatedUser,
            payload: result,
        });
    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);        
    }
});



router.delete('/delete', verifyAccessToken, async (req, res, next) => {
    try{
        // validation by Joi
        const result = await deleteSchema.validateAsync(req.body);

        const deletedUser = await User.findOneAndDelete({_id: result._id})
                .select({ "firstname": 1, "lastname": 1, "email": 1 });
        
        // console.log(deletedUser);

        if(!deletedUser){
            throw createError.Conflict(`This user '${result.email}' does not exists.`);
        }


        
        res.send({
            user: deletedUser,
            payload: result,
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);        
    }

});



//all users, without verifyAccessToken
router.get('/', async(req, res, next) => {
    console.log('abcd');
    try{
        // console.log(req.headers['authorization']);
        // console.log('user:', req.payload.aud);
        // const user = await User.findOne({_id: req.payload.aud})
        const user = await User.find({})
                .select({id:1, firstname:1, lastname:1, email:1})
                .exec();        

        req.user = user;
        //console.log(req.payload);

        res.send(
            req.user           
        );

    }catch(err){
        next(createError.Unauthorized(err.message));
    }
});



router.get('/allalong',  async(req, res, next) => {
    console.log("abcd");
    try{        
        const userAll = await User.find({})
                .select({id:1, firstname:1, lastname:1, email:1})
                .exec();

        

        res.send({
            user: userAll,
            
        })
    }catch(err){
        // console.log("err all users: " + err.message);
        next(createError.Unauthorized("this is test"));
    }
});



//specific user with id and verifyAccessToken
router.get('/:id', verifyAccessToken, async(req, res, next) => {
    try{
        // console.log(req.params.id)
        const userOne = await User.findOne({_id: req.params.id})
                .select({_id:1, firstname:1, lastname:1, email:1, password:0})
                .exec();

        res.send({
            user: userOne,
            
        })
    }catch(err){
        next(createError.Unauthorized());  
    }
});








module.exports = router