import { Schema, model, Types } from 'mongoose';

export interface Task {
  title: string;
  category: string;
  thumbnailUrl?: string;
  role: string; // e.g., UI/UX, Web Developer
  progressPercent: number; // 0-100
  durationLabel: string; // e.g., "1 Hour", "3 Days Left"
  mentors: Types.ObjectId[];
}

const taskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String },
    role: { type: String, required: true },
    progressPercent: { type: Number, default: 0 },
    durationLabel: { type: String, default: '' },
    mentors: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }]
  },
  { timestamps: true }
);

taskSchema.index({ title: 'text', category: 'text', role: 'text' });

export default model<Task>('Task', taskSchema);


