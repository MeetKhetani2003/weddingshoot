import mongoose, { Schema, Document } from 'mongoose';

export interface IThemeConfig extends Document<string> {
  _id: string;
  colors: {
    ink: string;
    bone: string;
    gold: string;
    background: string;
  };
  typography: {
    heroTitleSize: number;
    heroSubtitleSize: number;
    exploreTitleSize: number;
    sectionHeadingSize: number;
  };
}

const ThemeConfigSchema = new Schema({
  _id: { type: String, default: "theme" }, // singleton
  colors: {
    ink: { type: String, default: "#000000" },
    bone: { type: String, default: "#edddd3" },
    gold: { type: String, default: "#c5a880" },
    background: { type: String, default: "#edddd3" }
  },
  typography: {
    heroTitleSize: { type: Number, default: 4 }, // rem
    heroSubtitleSize: { type: Number, default: 3.75 }, // rem (60px)
    exploreTitleSize: { type: Number, default: 1.5 }, // rem
    sectionHeadingSize: { type: Number, default: 2.25 }, // rem
  }
}, { timestamps: true });

export default mongoose.models.ThemeConfig || mongoose.model<IThemeConfig>('ThemeConfig', ThemeConfigSchema);
