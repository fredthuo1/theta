const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  thetaHash: String,
  metadata: {
    name: String,
    description: String,
    hash: String,
  },
  category: { type: String, required: true },
  tags: [String],
});

module.exports = mongoose.model('Video', videoSchema);
