import mongoose, { Schema, Document } from 'mongoose';

export interface IFeaturedGallery extends Document {
  title: string;
  categoryLabel: string;
  location: string;
  imageId: string;
  orientation?: 'vertical' | 'horizontal' | 'auto';
  order: number;
}

const FeaturedGallerySchema: Schema = new Schema({
  title:         { type: String, required: true },
  categoryLabel: { type: String, required: true },
  location:      { type: String, required: true },
  imageId:       { type: String, required: true },
  orientation:   { type: String, enum: ['vertical', 'horizontal', 'auto'], default: 'auto' },
  order:         { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.FeaturedGallery
  || mongoose.model<IFeaturedGallery>('FeaturedGallery', FeaturedGallerySchema);
