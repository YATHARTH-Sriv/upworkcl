import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  connects: number;
  profile: {
    title?: string;
    location?: string;
    about?: string;
    hourlyRate?: number;
    availableHoursPerWeek?: number;
    skills?: string[];
    portfolio?: Array<{
      name: string;
      description: string;
      imageUrl?: string;
    }>;
  };
  projects: Array<{
    name: string;
    description: string;
  }>;
  testimonials: Array<{
    author: string;
    message: string;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    duration: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  connects: { type: Number, default: 50 },
  
  profile: {
    title: { type: String },
    location: { type: String },
    about: { type: String },
    hourlyRate: { type: Number },
    availableHoursPerWeek: { type: Number },
    skills: [{ type: String }],
    portfolio: [{
      name: { type: String },
      description: { type: String },
      imageUrl: { type: String }
    }]
  },
  
  projects: [{
    name: { type: String },
    description: { type: String }
  }],
  
  testimonials: [{
    author: { type: String },
    message: { type: String }
  }],
  
  workExperience: [{
    company: { type: String },
    position: { type: String },
    duration: { type: String }
  }],
  
  languages: [{
    language: { type: String },
    proficiency: { type: String }
  }]
});

const UserModel = (models.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);

export default UserModel;