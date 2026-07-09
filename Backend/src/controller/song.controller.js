const songModel = require('../model/song.model')
const storageService = require('../service/storage.service')
const id3 = require('node-id3')


async function uploadSong(req,res){
    const songBuffer = req.file.buffer;
    const {mood} = req.body

    const tags = id3.read(songBuffer)
    console.log(tags)

    // const songfile = await storageService.uploadFile({
    //     buffer: songBuffer,
    //     filename: tags.title + ".mp3",
    //     folder: "/cohort-2/modify/songs"

    // })

    // const posterfile = await storageService.uploadFile({
    //     buffer: tags.image.imageBuffer,
    //     filename: tags.title + ".jpeg",
    //     folder: "/cohort-2/modify/posters",

    // })

    // Optimizing way to uplaod file:

    const [songfile,posterfile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/modify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/modify/posters",
        })
    ])


    const song = await songModel.create({
        title: tags.title,
        url: songfile.url,
        posterUrl: posterfile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })
}

async function getSong(req, res) {
    try {
        const mood = req.query.mood;
        const songs = await songModel.find(mood ? { mood } : {});
        const song = songs[0] || null;

        return res.status(200).json({
            message: "song fetched successfully",
            song,
            songs,
        });
    } catch (err) {
        console.error("ERROR:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
    uploadSong,
    getSong
};