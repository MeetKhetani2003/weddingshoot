import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  place: string;
  tag: string;
  categoryId: Types.ObjectId;
  imageId: string;
}

const PortfolioSchema: Schema = new Schema({
  title: { type: String, required: true },
  place: { type: String, required: true },
  tag: { type: String, required: true }, 
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  imageId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
