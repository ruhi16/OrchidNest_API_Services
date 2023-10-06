const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)




// ==================== Member =============================
const memberSchema = Joi.object({    
    id: Joi.number().integer().min(1).max(10000), //.default(10)
    eccs_member_id: Joi.string().min(3).max(30),    
    //// email: Joi.string().email().lowercase().required(),    

    imageurl: Joi.array().items(Joi.string().uri()),
    emp_id: Joi.string().min(3).max(30),
    mobile: Joi.array().items(Joi.string().min(0).max(10)),

    full_name: Joi.string().min(3).max(30).required(),

    account_no: Joi.string().min(3).max(30).required(),
    bank_name: Joi.string().min(3).max(100).required(),
    branch_name: Joi.string().min(3).max(100).required(),
    branch_address: Joi.string().min(3).max(200).required(),
    branch_ifsc: Joi.string().min(3).max(30).required(),
    
    schoolId: Joi.objectId(),
    userId: Joi.objectId(),

    remarks: Joi.string().min(3).max(30),
});

const memberUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number().integer().min(1).max(10000), 
    eccs_member_id: Joi.string().min(3).max(30),    
      

    imageurl: Joi.array().items(Joi.string().uri()),
    emp_id: Joi.string().min(3).max(30),
    mobile: Joi.array().items(Joi.string().min(0).max(10)),

    full_name: Joi.string().min(3).max(30).required(),

    account_no: Joi.string().min(3).max(30).required(),
    bank_name: Joi.string().min(3).max(100).required(),
    branch_name: Joi.string().min(3).max(100).required(),
    branch_address: Joi.string().min(3).max(200).required(),
    branch_ifsc: Joi.string().min(3).max(30).required(),
    
    schoolId: Joi.objectId(),
    userId: Joi.objectId(),

    status: Joi.string().min(3).max(30).required(),
    remarks: Joi.string().min(3).max(30),
});

const memberDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
    full_name: Joi.string().min(3).max(30).required(),
});    






// ================== FinancialYear ========================
const financialYearSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number().integer().min(1).max(10000), 
    financialYear_name: Joi.string().min(3).max(30).required(),
    
    start_date: Joi.date().raw().required(), // set desired date format here
    end_date: Joi.date().raw().required(),

    // Joi.date().timestamp(), birthday: Joi.date().max('1-1-2004').iso(),
    // start_date: Joi.date().format('YYYY-MM-DD').required(),
    // start_date: Joi.date().format('YYYY-MM-DD').options({ convert: false }),  
    // Joi.date().default(() => moment().format(), 'date created'), 
    // Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']);
    // npm install @joi/date
    // Joi.date().format('YYYY-MM-DD HH:mm');
    // const schema = Joi.date().utc().format(['YYYY/MM/DD', 'DD-MM-YYYY']);
    
    // status: Joi.string().min(3).max(30).required(),
    remarks: Joi.string().min(3).max(30),
});    

const financialYearUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number().integer().min(1).max(10000), 
    financialYear_name: Joi.string().min(3).max(30).required(),
    
    start_date: Joi.date().raw().required(), // set desired date format here
    end_date: Joi.date().raw().required(), 
    
    status: Joi.string().min(3).max(30).required(),
    remarks: Joi.string().min(3).max(30),
});    

const financialYearDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
});    





// ====================== Bank ===============================
const bankSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number(),
    name: Joi.string().required(),
    bank_code: Joi.string(),
        
    schedule_time: Joi.string(), // 10:30am to 4:30pm
    
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    //email: {type: String, required: true, lowercase: true},
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),

    status:  Joi.string(),
    remarks: Joi.string(),
});    

const bankUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number(),
    name: Joi.string().required(),
    bank_code: Joi.string(),
        
    schedule_time: Joi.string(), // 10:30am to 4:30pm
    
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    //email: {type: String, required: true, lowercase: true},
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),

    status:  Joi.string(),
    remarks: Joi.string(),
});    

const bankDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),    
});    



// =========================== School =========================
const schoolSchema = Joi.object({
    // _id: Joi.objectId(),
    id: Joi.number(),
    name: Joi.string().required(),
    dise: Joi.string(),
    grade: Joi.string().required(),  // primary, junior-high, high, higher secondary
    eccs_name: Joi.string().required(),
    
    schedule_time: Joi.string().required(), // 10:30am to 4:30pm
    
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),

    banklId: Joi.objectId(),
    
    status: Joi.string(),
    remarks: Joi.string(),

});


const schoolUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(),
    name: Joi.string().required(),
    dise: Joi.string(),
    grade: Joi.string().required(),  // primary, junior-high, high, higher secondary
    eccs_name: Joi.string().required(),
    
    schedule_time: Joi.string().required(), // 10:30am to 4:30pm
    
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),

    banklId: Joi.objectId(),

    status: Joi.string(),
    remarks: Joi.string(),
});


const schoolDeleteSchema = Joi.object({
    _id: Joi.objectId(),
});






























module.exports = { 
    memberSchema, 
    memberUpdateSchema,
    memberDeleteSchema,

    financialYearSchema,
    financialYearUpdateSchema,
    financialYearDeleteSchema,

    bankSchema,
    bankUpdateSchema,
    bankDeleteSchema,

    schoolSchema,
    schoolUpdateSchema,
    schoolDeleteSchema,
}



// const Joi = require("joi"); 
// app.post("/register", async (req, res) => {

//   try {

//     // Define Schema

//     const schema = Joi.object({
//       username: Joi.string().min(6).alphanum().uppercase().required(),
//       password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
//       confirm_password:Joi.string().equal(Joi.ref('password')).messages({'any.only': 'password does not match' }).required(),
//       firstname: Joi.string().required(),
//       lastname: Joi.string(),
//       email: Joi.string().email({minDomainSegments: 2}).required(),
//                  .email({minDomainSegments: 2}) or tlds: { allow: ['com', 'net'] } })
//       phonenumber: Joi.string().min(6).regex(/^([+])?(\d+)$/).required(),
//       dob: Joi.date().max('01-01-2003').iso().messages({'date.format': `Date format is YYYY-MM-DD`,'date.max':`Age must be 18+`}).required(),
//       sex: Joi.string().valid('male', 'female','transger', 'others')

//     });

//     // Validate req.body against the defined schema
//     const validation = schema.validate(req.body);
//     const { value, error } = validation;

//     if (error) {
//       const message = error.details.map(x => x.message);

//       res.status(400).json({
//         status: "error",
//         message: "Invalid request data",
//         data: message
//       });
//     } else {
//       res.json({
//         status: "success",
//         message: "Registration successful",
//         data: value
//       });
//     }
//   } catch (error) {
//     res.json({status:"failed",message:error.message})
//   }
// });