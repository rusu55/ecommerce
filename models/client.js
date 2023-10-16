import {Schema, model, models } from 'mongoose';

const ClientSchema = new Schema({
    firstName: {
        type: String,        
        require: [true, 'First Name is required'],
        },
    lasttName: {
        type: String,        
        require: [true, 'Last Name is required'],
        },
    address: {
        type: String,        
    },
    phone: {
        type: String,
    },
    email:{
        type: String,
        unique: [true, 'Email already exist!'],
        require: [true, 'Email is required'],
    },
    weddingDate:{
        type: Date,
        require: [true, 'Wedding Date is required'],
    },
    value:{
        type: String,
    },
    services: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
    },   
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
    },   
})

const Client = models.Client || model("Client", ClientSchema)

export default Client;