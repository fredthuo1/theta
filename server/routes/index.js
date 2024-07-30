const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const multer = require('multer');
const upload = multer();

router.post('/upload', upload.single('file'), uploadController.uploadVideo);
router.get('/videos', async (req, res) => {
    const db = req.app.locals.db;
    const videosCollection = db.collection('videos');
    const videos = await videosCollection.find({}).toArray();
    res.json(videos);
});

router.get('/user/:address', userController.getUserProfile);
router.post('/user/:address', userController.updateUserProfile);
router.post('/report', videoController.reportVideo);

module.exports = router;
