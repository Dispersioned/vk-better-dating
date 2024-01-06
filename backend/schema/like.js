import { mongoose } from 'mongoose';
const { Schema } = mongoose;

const extraSchema = new Schema({
  hash: String,
});

const likeSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  sex: String,
  is_online: Boolean,
  last_active_at: Date,
  preview_url: String,
  extra: extraSchema,
});

export const LikeModel = mongoose.model('Like', likeSchema);
