const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)


const schoolLoanParticularSchema = Joi.object({
    id: Joi.number(),
    short_name: Joi.string().required(),
    full_name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(), //assign or payment
    
    schoollId: Joi.objectId(),
    status: Joi.string(),
    remarks: Joi.string(),
});

const schoolLoanParticularUpdatedSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(),
    short_name: Joi.string().required(),
    full_name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(), //assign or payment
    
    schoollId: Joi.objectId(),
    status: Joi.string(),
    remarks: Joi.string(),
});

const schoolLoanParticularDeletedSchema = Joi.object({
    _id: Joi.objectId(),    
});





const schoolLoanParticularsSpecificationSchema = Joi.object({
    id: Joi.number(), 
    //Joi.number().positive().precision(2).required().error(() => ({ message: 'Error', });      id: Joi.number().integer().min(2012).max(2019), .greater(5), .float();
    schoolLoanParticularId: Joi.objectId(),
    rate_of_interest: Joi.number(),
    amount: Joi.number(),
    type_of_collection: Joi.string(),    
    
    schoollId: Joi.objectId(),
    status: Joi.string(),
    remarks: Joi.string(),
});

const schoolLoanParticularsSpecificationUpdatedSchema= Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(), 
    //Joi.number().positive().precision(2).required().error(() => ({ message: 'Error', });      id: Joi.number().integer().min(2012).max(2019), .greater(5)
    
    schoolLoanParticularId: Joi.objectId(),
    rate_of_interest: Joi.number(),
    amount: Joi.number(),
    type_of_collection: Joi.string(),    
    
    schoollId: Joi.objectId(),
    status: Joi.string(),
    remarks: Joi.string(),
});

const schoolLoanParticularsSpecificationDeletedSchema = Joi.object({
    _id:Joi.objectId(),
});





const schoolLoanAssignDetailsSchema = Joi.object({
    id: Joi.number(), 
    schoolLoanAssignId: Joi.objectId(),
    schoolLoanParticularSpecificationId: Joi.objectId(),
    schoolLoanParticularAmount: Joi.number(),
    
    for_loan_term_no_paid: Joi.number(),
    is_done: Joi.boolean(),
    
    schoollId: Joi.objectId(),
    status: Joi.string(),
    remarks: Joi.string()
});

const schoolLoanAssignDetailsUpdatedSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(), 
    schoolLoanAssignId: Joi.objectId(),
    schoolLoanParticularSpecificationId: Joi.objectId(),
    schoolLoanParticularAmount: Joi.number(),
    
    for_loan_term_no_paid: Joi.number(),
    is_done: Joi.boolean(),
    
    schoollId: Joi.objectId(),
    status: Joi.string(),
    remarks: Joi.string()
});

const schoolLoanAssignDetailsDeletedSchema = Joi.object({
    _id: Joi.objectId()
});







const schoolLoanAssignSchema = Joi.object({
    id: Joi.number(), 
    memberId: Joi.number(),

    loan_amount: Joi.number(),
    loan_date: Joi.date(),    
    loan_total_month_terms: Joi.number(),    
    
    current_balance: Joi.number(),
    loan_last_term_no_paid: Joi.number(),

    loan_close_date: Joi.date(),

    
    schoollId: Joi.objectId(),
    status: Joi.string().required(),
    remarks: Joi.string()
});


const schoolLoanAssignUpdatedSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(), 
    memberId: Joi.number(),

    loan_amount: Joi.number(),
    loan_date: Joi.date(),    
    loan_total_month_terms: Joi.number(),    
    
    current_balance: Joi.number(),
    loan_last_term_no_paid: Joi.number(),

    loan_close_date: Joi.date(),

    
    schoollId: Joi.objectId(),
    status: Joi.string().required(),
    remarks: Joi.string()
});

const schoolLoanAssignDeletedSchema = Joi.object({
    _id: Joi.objectId()
});








const schoolLoanPaymentsSchema = Joi.object({
    id: Joi.number(),
    schoolLoanAssignId: Joi.objectId(),    
    previous_balance: Joi.number(),
    loan_last_term_no_paid: Joi.number(),

    loan_installment_total: Joi.number(),

    
    current_balance: Joi.number(),

    is_done: Joi.boolean(),
    schoolLoanPaymentDetailIds: Joi.array().items(Joi.objectId()),
    
    is_payment_closed: Joi.boolean(),
    
    schoollId: Joi.objectId(),
    status: Joi.string().required(),
    remarks: Joi.string()
});

const schoolLoanPaymentsUpdatedSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(),
    schoolLoanAssignId: Joi.objectId(),    
    previous_balance: Joi.number(),
    loan_last_term_no_paid: Joi.number(),

    loan_installment_total: Joi.number(),

    
    current_balance: Joi.number(),

    is_done: Joi.boolean(),
    schoolLoanPaymentDetailIds: Joi.array().items(Joi.objectId()),
    
    is_payment_closed: Joi.boolean(),
    
    schoollId: Joi.objectId(),
    status: Joi.string().required(),
    remarks: Joi.string()
});

const schoolLoanPaymentsDeletedSchema = Joi.object({
    _id: Joi.objectId()
});







const schoolLoanPaymentSchema = Joi.object({
    id: Joi.number(),
    schoolLoanAssignId: Joi.objectId(),
    schoolLoanPaymentId: Joi.objectId(),

    schoolLoanAssignDetailId: Joi.objectId(),
    schoolLoanParticularSpecificationId: Joi.objectId(),

    loan_installment_from_date: Joi.date(),
    loan_installment_to_date: Joi.date(),
    loan_installment_total_days: Joi.number(),

    
    schoolLoanParticularAmount: Joi.number(),
    is_done: Joi.boolean(),
    
    is_payment_closed: Joi.boolean(),

    schoollId: Joi.objectId(),
    status: Joi.string().required(),
    remarks: Joi.string()
});


const schoolLoanPaymentUpdatedSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(),
    schoolLoanAssignId: Joi.objectId(),
    schoolLoanPaymentId: Joi.objectId(),

    schoolLoanAssignDetailId: Joi.objectId(),
    schoolLoanParticularSpecificationId: Joi.objectId(),

    loan_installment_from_date: Joi.date(),
    loan_installment_to_date: Joi.date(),
    loan_installment_total_days: Joi.number(),

    
    schoolLoanParticularAmount: Joi.number(),
    is_done: Joi.boolean(),
    
    is_payment_closed: Joi.boolean(),

    schoollId: Joi.objectId(),
    status: Joi.string().required(),
    remarks: Joi.string()
});

const schoolLoanPaymentDeletedSchema = Joi.object({
    _id: Joi.objectId()
});



















module.exports = { 
    schoolLoanParticularSchema,
    schoolLoanParticularUpdatedSchema,
    schoolLoanParticularDeletedSchema,    

    schoolLoanParticularsSpecificationSchema,
    schoolLoanParticularsSpecificationUpdatedSchema,
    schoolLoanParticularsSpecificationDeletedSchema,
    


    
    schoolLoanAssignDetailsSchema,
    schoolLoanAssignDetailsUpdatedSchema,
    schoolLoanAssignDetailsDeletedSchema,

    schoolLoanAssignSchema,
    schoolLoanAssignUpdatedSchema,
    schoolLoanAssignDeletedSchema,




    schoolLoanPaymentsSchema,
    schoolLoanPaymentsUpdatedSchema,
    schoolLoanPaymentsDeletedSchema,

    schoolLoanPaymentSchema,
    schoolLoanPaymentUpdatedSchema,
    schoolLoanPaymentDeletedSchema,

}