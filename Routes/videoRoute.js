const { json } = require('body-parser');
const express = require ('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const videosData = require('../Data/video-details.json');
const { v4: uuidv4 } = require('uuid');
const { url } = require('inspector');

router.get('/', (req, res) => {
    res.status(200).json(videosData);
});

function generateUniqueId() {
    return uuidv4(); 
}

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
    saveVideoData(videosData);
    res.status(201).json(newVideo);
});

function saveVideoData(data) {
    const filePath = path.join(__dirname, '..', 'Data', 'video-details.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


module.exports = router;