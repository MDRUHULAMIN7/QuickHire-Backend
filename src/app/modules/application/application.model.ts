import { Schema, model, Types } from "mongoose";
import type { TApplication } from "./application.interface.js";

const applicationSchema = new Schema<TApplication>(
  {
    job: { type: Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume_link: { type: String, required: true },
    cover_note: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, email: 1 }, { unique: true });

export const Application = model<TApplication>("Application", applicationSchema);
