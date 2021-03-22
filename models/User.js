import mongoose from 'mongoose';

/* UserSchema will correspond to a collection in MongoDB database. */
const UserSchema = new mongoose.Schema(
  {
    ada_student: {
      type: Boolean,
    },
    age: {
      type: Number,
    },
    // createdAtDate: {
    //   default: Date.now,
    //   required: true,
    //   type: Date,
    // },
    dislikes: {
      /* List of things user does not like to do */
      type: Array,
    },
    image_url: {
      /* Url to user's image */
      required: [true, 'Please provide an image url for this user.'],
      type: String,
    },
    languages: {
      /* List of programming lenguages, if applicable */
      type: Array,
    },
    likes: {
      /* List of things user likes to do */
      type: Array,
    },
    name: {
      maxlength: [20, 'Name cannot be more than 20 characters'],
      required: [true, 'Please provide a name'],
      type: String,
    },
    organization: {
      maxlength: [30, 'Organizations cannot be more than 30 characters'],
      required: [true, 'Please specify your organization name.'],
      type: String,
    },
    password: {
      maxlength: [20, 'Password cannot be more than 20 characters'],
      required: [true, 'Please provide a password'],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
