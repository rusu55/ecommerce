import { Schema, model, models } from "mongoose";

const DateRangeSchema = new Schema({
    years: {
        type: String    
    }
})

const DateRange = models.DateRange || model('DateRange', DateRangeSchema)

export default DateRange