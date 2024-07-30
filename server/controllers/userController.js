const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  address: String,
  profile: {
    name: String,
    bio: String,
  },
});

const User = mongoose.model('User', userSchema);

exports.getUserProfile = async (req, res) => {
  try {
    const { address } = req.params;
    const user = await User.findOne({ address });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { address } = req.params;
    const { name, bio } = req.body;
    const user = await User.findOneAndUpdate(
      { address },
      { profile: { name, bio } },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
