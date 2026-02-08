const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'Untitled Resume'
    },
    templateId: {
        type: String,
        required: true,
        default: 'modern'
    },
    data: {
        personalInfo: {
            fullName: { type: String, default: '' },
            email: { type: String, default: '' },
            phone: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            linkedinLabel: { type: String, default: '' },
            portfolio: { type: String, default: '' },
            portfolioLabel: { type: String, default: '' },
            summary: { type: String, default: '' },
            location: { type: String, default: '' },
            photo: { type: String, default: '' }
        },
        education: { type: Array, default: [] },
        experience: { type: Array, default: [] },
        skills: { type: Array, default: [] },
        projects: { type: Array, default: [] }
    },
    layoutSettings: {
        fontSize: { type: Number, default: 10 },
        lineHeight: { type: Number, default: 1.3 },
        margin: { type: Number, default: 18 },
        sectionSpacing: { type: Number, default: 1.5 },
        themeColor: { type: String, default: '#000000' }
    },
    structureSettings: {
        sectionOrder: { type: Array, default: ['experience', 'education', 'projects', 'skills'] },
        sectionTitles: {
            type: Object,
            default: {
                experience: 'Experience',
                education: 'Education',
                projects: 'Projects',
                skills: 'Skills'
            }
        },
        dateFormat: { type: String, default: 'short' }
    },
    selectedFont: { type: String, default: 'Arial, Helvetica, sans-serif' },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
resumeSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Resume', resumeSchema);
