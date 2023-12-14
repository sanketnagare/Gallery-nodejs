import { model, Schema } from "mongoose";
const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    isVideo: {
        type: Boolean,
        required: true
    },
    tags: {
        type: String
    },
    email: {
        type: String
    },
    size: {
        type: Number
    },
    comments: [{
            text: {
                type: String,
                required: true
            },
            user: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
            replies: [
                {
                    text: {
                        type: String,
                        required: true
                    },
                    user: {
                        type: String,
                        required: true
                    },
                    timestamp: {
                        type: Date,
                        default: Date.now,
                    },
                }
            ]
        }]
});
const File = model("File", fileSchema);
export { File };
