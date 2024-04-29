const { json } = require('body-parser');
const express = require ('express');
const router = express.Router();
const videosData = require('../Data/video-details.json');

router.get('/', (req, res) => {
    res.status(200).json(videosData);
});

// GET /videos/:id  get a single video by ID
router.get('/:id', (req, res) => {
  
    const { id } = req.params;
    const video = videosData.find(v => v.id === id);
    if (video) {
        res.status(200).json(video);
    } else {
        res.status(404).send('Video not found');
    }
});

// POST /videos  add a new video
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const newVideo = {
        id: generateUniqueId(), 
        title,
        description
    };
    videosData.push(newVideo);
    res.status(201).json(newVideo);
});


module.exports = router;