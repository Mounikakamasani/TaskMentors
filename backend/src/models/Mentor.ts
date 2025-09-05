import { Schema, model } from 'mongoose';

export interface Mentor {
  fullName: string;
  title: string;
  avatarUrl?: string;
  followers: number;
  rating: number; // 0-5
  reviews: number;
  tasksCompleted: number;
  bio: string;
}

const mentorSchema = new Schema<Mentor>(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    avatarUrl: { type: String },
    followers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    bio: { type: String, default: '' }
  },
  { timestamps: true }
);

mentorSchema.index({ fullName: 'text', title: 'text', bio: 'text' });

export default model<Mentor>('Mentor', mentorSchema);


