/* eslint-disable camelcase */
/* eslint-disable sort-keys */
import mongoose from 'mongoose';

/* UserSchema will correspond to a collection in MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    /* The name of the user */

    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  password: {
    /* The access password the_property*/

    type: String,
    required: [true, 'Please provide a password'],
    maxlength: [20, 'Password cannot be more than 20 characters'],
  },
  organization: {
    /* The organization */

    type: String,
    required: [true, 'Please specify your organization name.'],
    maxlength: [30, 'Organizations cannot be more than 30 characters'],
  },
  age: {
    /* User's age, if applicable */

    type: Number,
  },
  ada_student: {
    /* Boolean ada_student value, if applicable */

    type: Boolean,
  },
  languages: {
    /* List of programming lenguages, if applicable */

    type: Array,
  },
  image_url: {
    /* Url to user's image */

    required: [true, 'Please provide an image url for this user.'],
    type: String,
  },
  likes: {
    /* List of things user likes to do */

    type: Array,
  },
  dislikes: {
    /* List of things user does not like to do */

    type: Array,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
