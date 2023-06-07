import mongoose from "mongoose"



export const toDoSchema = new mongoose.Schema({

    title:{
        type:String
    },
    content:{
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

});