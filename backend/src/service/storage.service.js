const ImageKit = require("imagekit");
const mongoose = require("mongoose");

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT,
});




function uploadFile(buffer) {

    return new Promise((resolve, reject) => {
        imagekit.upload({

            folder: 'songs',
            file: buffer,
            fileName: new mongoose.Types.ObjectId().toString(),
        }, (err, result) => {
        if (result) {
            resolve(result)
        } else {
            reject(err)
        }
    })
    })
}

module.exports = uploadFile