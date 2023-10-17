import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema({
    contractValue: {
        type: Number,
        require: [true, 'Contract Value is requested']
    },
    payment: {
        type: [{
            paymentDate: { 
                type: Date,
                default: Date.now
            },
            paymentAmount: {
                type: Number
            }
        }],
    }
})

const Payment = models.Payment || model('Payment', PaymentSchema)

export default Payment