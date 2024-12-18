import { Router } from 'express';
import { User } from '../models/user';
import { Course } from '../models/course';
import { authenticate } from '../middleware/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            enrolledCourses: []
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id.toString(), role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log in' });
    }
});

// Enroll in a course
router.post('/courses/:id/enroll', authenticate, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { id } = req.params;
        const courseId = new mongoose.Types.ObjectId(id);
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        if (course.learners.includes(userId)) {
            return res.status(400).json({ error: 'Already enrolled' });
        }

        course.learners.push(userId);
        req.user.enrolledCourses.push(courseId);

        await course.save();
        await req.user.save();

        res.status(200).json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to enroll in course' });
    }
});

export default router;