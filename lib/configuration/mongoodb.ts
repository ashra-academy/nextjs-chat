import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1){
      return mongoose.connection.asPromise()
    }
    if(process.env.MONGODB_URI){
      await mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Database Connected Successfully'))
    }
  } catch (err) {
    console.log('Failed to connect database with error-> : ', err)
  }
}
