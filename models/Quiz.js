import mongoose from 'mongoose';

const selectAnswerSchema = new mongoose.Schema({
  isCorrect: {
    default: false,
    type: Boolean,
  },
  isSelected: {
    default: false,
    type: Boolean,
  },
  title: {
    default: '',
    required: true,
    type: String,
  },
});
const selectQuestionSchema = new mongoose.Schema({
  answers: [selectAnswerSchema],
  isAnswered: {
    default: false,
    type: Boolean,
  },
  isCorrect: {
    default: false,
    type: Boolean,
  },
  title: {
    default: '',
    type: String,
  },
});

const quizSchema = new mongoose.Schema(
  {
    difficulty: {
      default: '',
      required: true,
      type: String,
    },
    isCompleted: {
      default: false,
      type: Boolean,
    },
    progress: {
      default: 0,
      type: Number,
    },
    questions: [selectQuestionSchema],
    title: {
      default: '',
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
