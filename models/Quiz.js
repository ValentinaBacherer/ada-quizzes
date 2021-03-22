import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    difficult: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Quiz || mongoose.model('Quiz', quizSchema);
