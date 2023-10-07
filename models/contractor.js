import mongoose from 'mongoose';
import { Schema, model, models} from 'mongoose;'

const ContractorSchema = new Schema({
    name: {
    type: String,
    unique: [true, 'Contractor already exist!'],
    require: [true, 'Name of Contractor is required'],
    },
    email:{
        type: String,
        unique: [true, 'Email already exist!'],
        require: [true, 'Email is required'],
    },
    phone:{
        type: String,       
        require: [true, 'Phone is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});

const Contractor = models.Contractor || model("Contractor", UserSchema)

export default Contractor;