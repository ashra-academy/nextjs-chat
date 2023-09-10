import mongoose, { Schema, models } from "mongoose";

const chatsSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    userId: {
        type: String
    },
    path: {type: String},
    sharePath: {type: String},
    messages: [
        {
            role: {
                type: String
            },
            content: {
                type: String
            },
            createdTime: {
                type: Number
            }
        }
    ],
}, {
    timestamps: true
})

const Chat = models.Chat || mongoose.model("Chat", chatsSchema);

export default Chat;