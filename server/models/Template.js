const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // e.g., 'harvard', 'modern'
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String }, // CSS class or image URL
    features: [{ type: String }],
    isAtsFriendly: { type: Boolean, default: true },
    recommendedFor: [{ type: String }] // e.g., ['Finance', 'Consulting']
});

module.exports = mongoose.model('Template', templateSchema);
