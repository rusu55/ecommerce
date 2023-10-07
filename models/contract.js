import { Int32 } from 'mongodb';
import mongoose from 'mongoose';
import { Schema, model, models} from 'mongoose;'

const ContractSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },   
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    services: [{
        type: String,
        require: [true, 'Service is required'],
        }],
    Value: {
        type: Int32,
        require: [true, 'Contract Value required'],
    }
});

const Contractor = models.Contractor || model("Contractor", UserSchema)

export default Contractor;