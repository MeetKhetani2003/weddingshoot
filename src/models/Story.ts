import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  body: string[];
  imageId: string;
}

const StorySchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  body: { type: [String], required: true },
  imageId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model<IStory>('Story', StorySchema);
