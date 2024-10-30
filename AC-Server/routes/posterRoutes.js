const express = require('express');
const router = express.Router();
const multer = require('multer');
const posterController = require('../controllers/posterController');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });

router.get('/posters', posterController.getPosters);
router.put('/upload/:id', upload.single('poster'), posterController.updatePoster);
router.get('/search', posterController.searchPoster);

module.exports = router;