import {Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({    
      services: {
        type:[String],
        required: true
      }       
})

const Service = models.Service || model("Service", ServiceSchema)

export default Service;