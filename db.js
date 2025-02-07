import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

function connectDB() {
  mongoose.connect(uri)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err))
}

export default connectDB
