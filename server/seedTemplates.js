require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('./models/Template');

const templates = [
    {
        id: 'modern',
        name: 'Modern Professional',
        description: 'Balanced design with soft accents. Perfect for general roles and startups.',
        thumbnail: 'bg-slate-800',
        features: ['Soft Accents', 'Clean Headers', 'Photo Optional'],
        recommendedFor: ['Startups', 'Product', 'General']
    },
    {
        id: 'harvard',
        name: 'Harvard Classic',
        description: 'The gold standard for high-finance, law, and consulting. Serif font, strict linear layout.',
        thumbnail: 'bg-white border border-gray-200',
        features: ['Serif Font', 'Linear Layout', 'Maximum Density'],
        recommendedFor: ['Investment Banking', 'Consulting', 'Academic']
    },
    {
        id: 'mnc-standard',
        name: 'Corporate Clean (TCS/Wipro)',
        description: 'Optimized for mass recruiters. Conservative spacing, clear sections, no icons.',
        thumbnail: 'bg-blue-900',
        features: ['Strict ATS', 'No Icons', 'Detailed Experience'],
        recommendedFor: ['TCS', 'Wipro', 'Infosys']
    },
    {
        id: 'tech-minimalist',
        name: 'Tech Stack Highlight',
        description: 'For backend and full-stack roles. Emphasizes skills and GitHub projects.',
        thumbnail: 'bg-slate-900 border border-neon-green/30',
        features: ['Monospace Headers', 'Grid Skills', 'Git Stats'],
        recommendedFor: ['Software Engineering', 'DevOps', 'Cybersecurity']
    },
    {
        id: 'project-centric',
        name: 'Project Centric Fresher',
        description: 'Highlights projects over experience. Ideal for fresh graduates with strong portfolios.',
        thumbnail: 'bg-purple-900',
        features: ['Bold Project Titles', 'Inline Tech Stack', 'GitHub Links'],
        recommendedFor: ['Freshers', 'Interns', 'Students']
    },
    {
        id: 'minimal-fresher',
        name: 'Minimal Fresher',
        description: 'Single column, text-only, strict vertical flow. The safest bet for any ATS.',
        thumbnail: 'bg-gray-100 text-gray-800',
        features: ['Single Column', 'No Icons', 'High Readability'],
        recommendedFor: ['Campus Placements', 'Government', 'Traditional']
    },
    {
        id: 'two-column',
        name: 'Two-Column Skills Focus',
        description: 'Sidebar layout that highlights a wide range of technical skills. Excellent for full-stack developers.',
        thumbnail: 'bg-slate-100 border border-slate-300',
        features: ['Sidebar', 'Skill Heavy', 'Compact'],
        recommendedFor: ['Full Stack', 'DevOps', 'Generalist']
    },
    {
        id: 'student',
        name: 'Student / Intern',
        description: 'Optimized for students and freshers. Prioritizes Education and Skills.',
        thumbnail: 'bg-white border-2 border-dashed border-gray-300',
        features: ['Education First', 'Skills Grid', 'Coursework'],
        recommendedFor: ['Students', 'Interns', 'Freshers']
    },
    {
        id: 'academic',
        name: 'Academic / Research',
        description: 'Detailed layout prioritizing education, publications, and research experience.',
        thumbnail: 'bg-stone-50 border border-stone-200',
        features: ['Detailed', 'Education First', 'Serif'],
        recommendedFor: ['PhD', 'Research', 'Academia']
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resumebuilder')
    .then(async () => {
        console.log('Connected to MongoDB...');

        await Template.deleteMany({}); // Clear existing
        console.log('Cleared existing templates.');

        await Template.insertMany(templates);
        console.log(`Seeded ${templates.length} templates successfully.`);

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
