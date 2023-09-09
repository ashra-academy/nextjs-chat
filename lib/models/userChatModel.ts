import mongoose from 'mongoose'

const userChatsSchema = new mongoose.Schema(
  {
    userChatId: {
      type: String,
      required: true
    },
    score: {
      type: String
    },
    member: {
      type: String
    }
  },
  {
    timestamps: true
  }
)


const UserChat =
  mongoose.models.UserChat || mongoose.model('UserChat', userChatsSchema)
export default UserChat
