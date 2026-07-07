const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
    privateKey: process.env.privateKey,
});

async function uploadFile({ buffer, filename, folder = "" }) {
    const res = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: filename,
        folder,
    });

    return res;
}

module.exports = {
    uploadFile,
};