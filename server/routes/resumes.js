const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

// @route   GET /api/resumes
// @desc    Get all resumes for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.userId }).sort({ updatedAt: -1 });
        res.json({
            success: true,
            resumes
        });
    } catch (error) {
        console.error('Get resumes error:', error);
        res.status(500).json({ message: 'Server error fetching resumes' });
    }
});

// @route   GET /api/resumes/:id
// @desc    Get single resume
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json({
            success: true,
            resume
        });
    } catch (error) {
        console.error('Get resume error:', error);
        res.status(500).json({ message: 'Server error fetching resume' });
    }
});

// @route   POST /api/resumes
// @desc    Create new resume
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, templateId, data, layoutSettings, structureSettings, selectedFont } = req.body;

        console.log('Creating resume with data:', { title, templateId, dataKeys: Object.keys(data || {}) });

        const resume = await Resume.create({
            userId: req.userId,
            title: title || 'Untitled Resume',
            templateId: templateId || 'modern',
            data: data || {},
            layoutSettings: layoutSettings || {},
            structureSettings: structureSettings || {},
            selectedFont: selectedFont || 'Arial, Helvetica, sans-serif'
        });

        res.status(201).json({
            success: true,
            resume
        });
    } catch (error) {
        console.error('Create resume error:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: 'Server error creating resume', error: error.message });
    }
});

// @route   PUT /api/resumes/:id
// @desc    Update resume
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, templateId, data, layoutSettings, structureSettings, selectedFont } = req.body;

        let resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Update fields
        if (title !== undefined) resume.title = title;
        if (templateId !== undefined) resume.templateId = templateId;
        if (data !== undefined) resume.data = data;
        if (layoutSettings !== undefined) resume.layoutSettings = layoutSettings;
        if (structureSettings !== undefined) resume.structureSettings = structureSettings;
        if (selectedFont !== undefined) resume.selectedFont = selectedFont;

        await resume.save();

        res.json({
            success: true,
            resume
        });
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({ message: 'Server error updating resume' });
    }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        await resume.deleteOne();

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        console.error('Delete resume error:', error);
        res.status(500).json({ message: 'Server error deleting resume' });
    }
});

module.exports = router;
