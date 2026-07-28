import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeConfig extends Document<string> {
  _id: string;
  hero: {
    subtitle: string;
    title: string;
    titleHighlight: string;
    imageIds: string[];
  };
  explore: {
    layout: 'carousel' | 'grid';
    cardShape: 'portrait' | 'square' | 'landscape' | 'circle';
    spacing: 'small' | 'medium' | 'large';
    items: {
      label: string;
      href: string;
      imageId: string;
      orientation?: 'vertical' | 'horizontal' | 'auto';
      galleryImageIds?: string[];
    }[];
  };
}

const HomeConfigSchema = new Schema({
  _id: { type: String, default: "home" }, // singleton
  hero: {
    subtitle: { type: String, default: "Creating timeless memories" },
    title: { type: String, default: "Where every celebration becomes" },
    titleHighlight: { type: String, default: "\"Eternal\"" },
    imageIds: [{ type: String }],
  },
  explore: {
    layout: { type: String, enum: ["carousel", "grid"], default: "carousel" },
    cardShape: { type: String, enum: ["portrait", "square", "landscape", "circle"], default: "portrait" },
    spacing: { type: String, enum: ["small", "medium", "large"], default: "medium" },
    items: [{
      label: String,
      href: String,
      imageId: String,
      orientation: { type: String, enum: ["vertical", "horizontal", "auto"], default: "auto" },
      galleryImageIds: [{ type: String }]
    }]
  }
}, { timestamps: true });

export default mongoose.models.HomeConfig || mongoose.model<IHomeConfig>('HomeConfig', HomeConfigSchema);
