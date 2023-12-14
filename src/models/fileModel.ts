import mongoose, {model, Schema} from "mongoose";

interface Comment{
    text:String,
    user:String,
    replies?:Comment[],
    timestamp: Number;
}

interface Fileinterface{ 
    name:String,
    fileUrl:String,
    isVideo:Boolean,
    size: Number,
    tags:String,
    email:String,
    comments:mongoose.Types.DocumentArray<Comment>;
}

const fileSchema = new Schema<Fileinterface>({
    name:{
        type:String,
        required:true
    },
    fileUrl: {
        type: String,
        required: true
    },
    isVideo: {
        type:Boolean,
        required: true
    },
    tags: {
        type:String
    },
    email: {
        type:String
    },
    size:{
        type:Number
    },
    comments:[{
        text:{
            type:String,
            required:true
        },
        user:{
            type:String,
            required:true
        },
        timestamp:{
            type:Date,
            default:Date.now,
        },
        replies:[
            {
                text:{
                    type:String,
                    required:true
                },
                user:{
                    type:String,
                    required:true
                },
                timestamp:{
                    type: Date,
                    default: Date.now,
                },
            }
        ]
    }]
})


const File = model<Fileinterface>("File", fileSchema);

export {File};

