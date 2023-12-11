import { model, Schema } from "mongoose";
const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
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
                }
            ]
        }]
});
// fileSchema.post('save', async (doc) => {
//     let transporter = nodemailerConfig(doc);
//     let info = (await transporter).sendMail({
//         from: "Sanket Project",
//         to: doc.email.toString(),
//         subject: "New File uploaded to Cloud",
//         html: `<h2>Hello ${doc.name}</h2>
//             <p>Your File Uploded Succesfully</p>
//             <a href = "${doc.imageUrl}"> View here </a>
//         `
//     })
//     console.log(info);
// })
const File = model("File", fileSchema);
export { File };
