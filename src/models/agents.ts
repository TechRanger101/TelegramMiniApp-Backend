import mongoose, { Schema } from 'mongoose';

// Create a Schema corresponding to the document interface.
const agentSchema = new Schema({  
    agentId: {type: String, required: true, default: "New Agent"},
    agentImage: {type: String, required: true, default: "images/bot1.png"},
    level: { type: Number, required: true, default: 1 },
    assignTo: {   type: mongoose.Schema.Types.ObjectId,  ref: 'Job'},
    passiveIncome: {type: Number, default: 1},
});

// Create a Model from the schema.
const Agent = mongoose.model('Agent', agentSchema);

export default Agent;