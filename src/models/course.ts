import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    videos: { number: number; url: string }[]; // Numbered videos
    creator: mongoose.Types.ObjectId; // Reference to the posting account
    learners: mongoose.Types.ObjectId[]; // Enrolled learners
}

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videos: [
        {
            number: { type: Number, required: true },
            url: { type: String, required: true }
        }
    ],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    learners: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export const Course = mongoose.model<ICourse>('Course', courseSchema);
