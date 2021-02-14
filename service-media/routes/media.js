const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const fs = require('fs')

const {Media} = require('../models');

router.get('/', async (req, res, next) => {
    const media = await Media.findAll({
        attributes: ['id', 'image']
    });

    const mappedMedia = media.map((m) => {
        m.image = `${req.get('host')}/images/${m.image}`
    })

    return res.json({
        status: 'success',
        data: media
    })
})

router.post('/', (req, res, next) => {
    const image = req.body.image;
    if (!isBase64(image, {mimeRequired: true})) {
        return res.status(400).json({status: 'error', message: 'invalid base64'});
    }

    base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
        if (err) {
            return res.status(400).json({status: 'error', message: err});
        }

        const filename = filepath.split('/').pop();
        const media = await Media.create({image: filename});

        return res.status(201).json({
            status: 'success',
            data: {
                id: media.id,
                image: `${req.get('host')}/images/${filename}`
            }
        })

    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const media = await Media.findByPk(id);

    if (!media) {
        return res.status(400).json({
            status: 'error',
            message: 'media not found'
        })
    }

    fs.unlink(`./public/images/${media.image}`, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                message: err
            })
        }

        await media.destroy();

        return res.status(400).json({
            status: 'success',
            message: 'image deleted!'
        })

    })


})

module.exports = router;
