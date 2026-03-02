import { Schema, model } from "mongoose";
import type { TJob } from "./job.interface.js";
import { EMPLOYMENT_TYPES } from "./job.constant.js";

const jobSchema = new Schema<TJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    employment_type: { type: String, enum: [...EMPLOYMENT_TYPES], default: 'Full Time', required: true },
    tags: { type: [String], default: [] },
    company_logo_url: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

jobSchema.index({ title: "text", company: "text", location: "text", category: "text" });
jobSchema.index({ title: 1, company: 1, location: 1 }, { unique: true });

export const Job = model<TJob>("Job", jobSchema);
