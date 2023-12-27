import { mongoose } from 'mongoose';
const { Schema } = mongoose;

const storySchema = new Schema({
  large_url: String,
  medium_url: String,
  small_url: String,
  type: String,
  url: String,
  size: {
    width: Number,
    height: Number,
  },
  media_index: String,
});

const artistSchema = new Schema({
  id: String,
  name: String,
});

const formSchema = new Schema({
  about: String,
  work: String,
  education: String,
  movies: String,
  books: String,
  height: Number,
  sport: String,
  target: String,
  kids: String,
  alcohol: String,
  family: String,
  interests: [String],
  labels: [String],
  artists: [String],
});

const formExtensionSchema = new Schema({
  artists: [artistSchema],
});

const extraSchema = new Schema({
  distance: Number,
  hash: String,
  meta: String,
});

const userSchema = new Schema({
  id: Number,
  name: String,
  preview_url: String,
  stories: [storySchema],
  sex: String,
  age: Number,
  is_verify: Boolean,
  is_deleted: Boolean,
  is_blocked: Boolean,
  is_online: Boolean,
  is_premium_enabled: Boolean,
  last_active_at: Date,
  form: formSchema,
  form_extension: formExtensionSchema,
  extra: extraSchema,
  zodiac_sign_id: String,
});

export const UserModel = mongoose.model('User', userSchema);
