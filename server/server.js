require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.send('Resume Builder API is running');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resumebuilder')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const { generatePDF } = require('./services/pdfService');
const Template = require('./models/Template'); // Import Model

// Import Routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

// Template Routes
app.get('/api/templates', async (req, res) => {
  try {
    const templates = await Template.find({});
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates' });
  }
});

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { html, templateId } = req.body;

    if (!html) {
      return res.status(400).send('HTML content is required');
    }

    console.log(`Generating PDF for template: ${templateId || 'custom'}`);
    const pdfBuffer = await generatePDF(html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': `attachment; filename="resume.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation failed:', error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
