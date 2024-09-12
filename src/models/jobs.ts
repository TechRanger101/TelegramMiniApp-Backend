import mongoose, { Schema } from 'mongoose';  

// Define the schema for the Job model  
const jobSchema = new Schema({
    title: { type: String, required: true },  
    employer: { type: String, required: true },  
    description: { type: String, required: true },  
    requiredLevel: { type: Number, required: true, default: 1 },
    requiredPower: {type: Number, required: true, default: 1},
    passiveIncome: { type: Number, required: true, default: 1 },  
    assignState: { type: Boolean, default: false },  
});

// Create the model from the schema
const Job = mongoose.model('Job', jobSchema);

export default Job;