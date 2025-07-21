const express = require('express')
const songModel = require('../models/song.model')
const multer = require('multer')
const uploadFile = require('../service/storage.service')

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });




router.post('/songs', upload.single('audio'), async (req, res) => {

    const { title, artist, mood } = req.body

    const file = await uploadFile(req.file.buffer)

    const song = await songModel.create({
        title, artist, audio: file.url, mood
    })

    res.status(201).json({
        msg: 'song created',
        song
    })

})







module.exports = router 