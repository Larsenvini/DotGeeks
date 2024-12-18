import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'learner' | 'organization';
    enrolledCourses: mongoose.Types.ObjectId[];
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['learner', 'organization'], required: true },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

export const User = mongoose.model<IUser>('User', userSchema);