const express = require('express');
const multer = require('multer');
const path = require('path');
const { Room } = require('../models/Room');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Setting upload destination to "uploads/"');
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        console.log(`Generating filename: ${filename}`);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// POST route for uploading a new room
router.post('/upload', upload.single('image'), async (req, res) => {
    console.log('Received POST request to /upload');
    try {
        const { number, comment, rating, username } = req.body;
        console.log('Received upload data:', { number, comment, rating, username });
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imagePath = req.file.filename;
        const room = await Room.create({
            number,
            image_path: imagePath,
            comment,
            rating: parseInt(rating, 10),
            username: username || 'Anonymous'
        });
        console.log('Created room:', room.toJSON());
        res.json({ message: 'Upload successful', room });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET route for fetching rooms
router.get('/rooms', async (req, res) => {
    console.log('Received GET request to /rooms');
    try {
        const rooms = await Room.findAll({
            attributes: ['id', 'number', 'image_path', 'comment', 'rating', 'username', 'createdAt', 'updatedAt'],
            order: [['number', 'ASC']]
        });
        console.log('Fetched rooms:', rooms.map(room => room.toJSON()));
        res.json(rooms);
    } catch (error) {
        console.error('Fetch rooms error:', error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE route for deleting a room
router.delete('/rooms/:id', async (req, res) => {
    console.log('Received DELETE request to /rooms/:id');
    try {
        const { id } = req.params;
        console.log('Deleting room with id:', id);
        await Room.destroy({ where: { id } });
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Delete room error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
