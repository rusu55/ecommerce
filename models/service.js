import {Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({    
        photography: {
            type: String,
        },
        videography: {
            type: String,
        },
        tag:{
            type: String,
        }
})

const Service = models.Service || model("Service", ServiceSchema)

export default Service;