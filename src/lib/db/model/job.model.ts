import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  techStack: string[];
  budget: {
    min: number;
    max: number;
  };
  postedBy: mongoose.Types.ObjectId;
  applicants: Array<{
    userId: mongoose.Types.ObjectId;
    proposal: string;
    appliedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  budget: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    proposal: String,
    appliedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);