import {Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({        
        photoDueDate: {
            type: String,
        },
        videoDueDate: {
            type: String,
        },
        tag:{
            type: String,
        }
})

const Project = models.Project || model("Project", ProjectSchema)

export default Project;