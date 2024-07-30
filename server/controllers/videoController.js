const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  videoId: String,
  reason: String,
  reportedAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);

exports.reportVideo = async (req, res) => {
  try {
    const { videoId, reason } = req.body;
    const report = new Report({ videoId, reason });
    await report.save();
    res.json({ success: true, message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
