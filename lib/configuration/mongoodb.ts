import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  console.log(process.env.MONGODB_URI)
  try {
    if(process.env.MONGODB_URI){
      await mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Database Connected Successfully'))
    }
  } catch (err) {
    console.log('Failed to connect database with error-> : ', err)
  }
}
export const closeMongoDB = async () => {
  try {
    mongoose.connection.close();
  } catch (err) {
    console.log('Failed to close database connection with error-> : ', err)
  }
}
