import mongoose from 'mongoose';

// eslint-disable-next-line require-await
async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnect;
