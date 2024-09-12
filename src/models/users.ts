import mongoose, { Schema } from 'mongoose';
import {generateRefferalCode, generateDailyMisions} from "../utils";
const userSchema = new Schema({
        userId: { type: Number, required: true },
        userName: {type: String, required: true},
        avatar: { type: String, default: ""},  
        coins: { type: Number, default: 0 },  
        energy: { type: Number, default: 1000 },
        power: {type: Number, default: 0},  
        data: { type: Number, default: 0 },
        gpus: { type: Number, default: 0 },  
        level: { type: Number, default: 1 },
        levelRate: {type: Number, default: 0},
        passiveIncome: {type: Number, default: 2},
        referralIncome: {type: Number, default: 0},
        agents: [
            {  
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Agent' // Update this to your Agent schema reference  
            }  
        ],  
        referralUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // User who referraled
        ,
        friends: [
            {  
                type: mongoose.Schema.Types.ObjectId,  
                ref: 'User'  
            }
        ],
        candidateFriends:[
            {  
                type: mongoose.Schema.Types.ObjectId,  
                ref: 'User'  
            } 
        ],
        referralCode: { type: String, required: true, default: generateRefferalCode()}
    },
    {  
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const User = mongoose.model('User', userSchema);

export default User;