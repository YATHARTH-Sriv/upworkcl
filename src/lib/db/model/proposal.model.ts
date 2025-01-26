import mongoose, { Schema, Document } from 'mongoose';

export interface IProposal extends Document {
  jobId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  proposal: string;
  budget: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const ProposalSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  proposal: { type: String, required: true },
  budget: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

export default mongoose.models.Proposal || mongoose.model<IProposal>('Proposal', ProposalSchema);