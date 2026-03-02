import { Schema, model, Types } from "mongoose";
import type { TApplication } from "./application.interface.js";

const applicationSchema = new Schema<TApplication>(
  {
    job: { type: Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
    resumeLink: { type: String, required: true, match: [/^https?:\/\/.+/, 'Please enter a valid URL starting with http/https'] },
    coverNote: { type: String, required: true, minlength: 50 },
    status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, email: 1 }, { unique: true });

export const Application = model<TApplication>("Application", applicationSchema);
