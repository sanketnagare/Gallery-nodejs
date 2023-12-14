import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";
export const downloadImage = async (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../files', filename);
    const validExtension = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'];
    const fileExtension = path.extname(filename).toLowerCase().substring(1);
    console.log(fileExtension);
    if (validExtension.includes(fileExtension)) {
        let contenttype = `image/${fileExtension}`;
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', contenttype);
        const filestream = fs.createReadStream(filepath);
        filestream.pipe(res);
    }
    else {
        res.status(400)
            .send("Invalid file extension");
    }
};
export const downloadVideo = async (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../files', filename);
    const validVideoExtension = ['mp4', 'avi', 'mkv'];
    const fileExtension = path.extname(filename).toLowerCase().substring(1);
    console.log(fileExtension);
    if (validVideoExtension.includes(fileExtension)) {
        let contenttype = `video/${fileExtension}`;
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', contenttype);
        const filestream = fs.createReadStream(filepath);
        filestream.pipe(res);
    }
    else {
        res.status(400)
            .send("Invalid extension for video");
    }
};
