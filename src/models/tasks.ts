import mongoose, { Schema } from 'mongoose';

// const  LabelTaskDetail: Schema = new Schema({  
//     images: [{type: String}],
//     labels: [{type: String}]
// })

// const AnnotationTaskDetail: Schema = new Schema({  
//     question: {type: String},
//     answer: {type: String},  
//     feedback: [{type: String}]  
// })

// const CodingTaskDetail: Schema = new Schema ({  
//     problem: [{type: String}],
//     answer: [{type: String}]
// });

// Schema definition for the Task  
const taskSchema: Schema = new Schema({  
        category: { type: String, enum: ['DeTask', 'Social Task', 'Educational Task', 'Other'], required: true, default: 'DeTask'},
        type: {type: String, enum: ['data_labeling', 'prompt_engineering', 'Q_A','coding', 'Other'], required: true}, 
        title: { type: String, required: true }, 
        description: {type: Schema.Types.Mixed, required: true},  
        reward: [
            { type: Number, required: true }
        ],
        provider: {type: String},
    },{  
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
    }
);  

// Create and export the model compiled from the schema  
const Task = mongoose.model('Task', taskSchema);

export default Task;