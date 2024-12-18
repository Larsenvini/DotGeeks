import { Router } from 'express';
import { Course } from '../models/course';
import { authenticate, authorize } from '../middleware/auth';
import mongoose from 'mongoose';

const router = Router();

// Create a new course
router.post('/', authenticate, authorize(['organization']), async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { title, description } = req.body;

        const newCourse = new Course({
            title,
            description,
            videos: [],
            creator: new mongoose.Types.ObjectId(req.user._id as mongoose.Types.ObjectId) // Explicitly cast _id
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create course' });
    }
});

// Upload videos to a course
router.post('/:id/videos', authenticate, authorize(['organization']), async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { id } = req.params;
        const { url } = req.body;

        const course = await Course.findById(id);
        if (!course || !course.creator.equals(new mongoose.Types.ObjectId(req.user._id as mongoose.Types.ObjectId))) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const newVideoNumber = course.videos.length + 1;
        course.videos.push({ number: newVideoNumber, url });
        await course.save();

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload video' });
    }
});

export default router;
