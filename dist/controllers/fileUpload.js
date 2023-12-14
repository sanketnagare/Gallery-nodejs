import { File } from '../models/fileModel.js';
import fs from 'fs';
import mongoose from 'mongoose';
// for __dirname error not support in es6
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";
const ObjectId = mongoose.Types.ObjectId;
const generateUniqueId = () => {
    return new ObjectId();
};
// Upload image
export const localFileUpload = async (req, res) => {
    try {
        console.log("I was here");
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No files were uploaded.' });
        }
        const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;
        console.log(file);
        // Date.now provides current time in miliseconds
        // let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        // const uniqueId = uuid();
        const uniqueId = generateUniqueId();
        let path1 = path.join(__dirname, '../files', `${uniqueId}.${file.name.split('.')[1]}`);
        path1 = path1.replace(/\\/g, '/');
        file.mv(path1, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
        const dataObj = new File({
            _id: uniqueId,
            name,
            tags,
            email,
            size: file.size,
            fileUrl: `${path1.split('/').pop()}`,
            isVideo: false,
            comments: []
        });
        const data = await dataObj.save();
        res.json({
            success: true,
            data: data,
            message: "Image Uploaded Successfully"
        });
    }
    catch (error) {
        console.log("Not able to upload the file on server");
        console.log(error);
    }
};
// get all images in DB
export const getAllImages = async (req, res) => {
    try {
        const imagesData = await File.find({ isVideo: false }); //only images no videos
        res.status(200)
            .json({
            success: true,
            data: imagesData,
            message: "All Images fetched suucessfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "server error at getAllImages"
        });
    }
};
// Delete image
export const deleteImage = async (req, res) => {
    const imageId = req.params.id;
    try {
        const image = await File.findById(imageId);
        if (!image) {
            return res.status(404)
                .json({
                success: false,
                message: "Image not found"
            });
        }
        let imagePath = path.join(__dirname, '../files', image.fileUrl.toString());
        console.log(imagePath);
        // delete from folder
        fs.unlinkSync(imagePath);
        // delete record from DB
        await File.findByIdAndDelete(imageId);
        res.status(200)
            .json({
            success: true,
            message: "Image Deleted Succesfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "Server Error while deleting image"
        });
    }
};
// ---------------------------------------VIDEO---------------------------------------------
const isFileSupported = (type, supportedTypes) => {
    // return supportedTypes.includes(type);
    return supportedTypes.includes(type.toLowerCase());
};
// Video upload
export const localVideoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No video were uploaded.' });
        }
        const videofile = Array.isArray(req.files.videoFile) ? req.files.videoFile[0] : req.files.videoFile;
        console.log(videofile);
        const videofileType = videofile.name.split('.')[1].toLowerCase();
        const supportedTypes = ["mp4", "mkv", "avi"];
        // check if video is spported or not
        if (!isFileSupported(videofileType, supportedTypes)) {
            return res.status(400)
                .json({
                sucess: false,
                message: "Video format is not supported"
            });
        }
        // Allowed file size in mb
        const allowed_file_size = 150;
        if ((videofile.size / (1024 * 1024)) > allowed_file_size) {
            return res.status(413)
                .json({
                success: false,
                message: "Video size should be under 150Mb"
            });
        }
        // const uniqueId = uuid();
        const uniqueId = generateUniqueId();
        let path2 = path.join(__dirname, '../files', `${uniqueId}.${videofile.name.split('.')[1]}`);
        path2 = path2.replace(/\\/g, '/');
        videofile.mv(path2, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
        // after upload creation of entry in DB
        const dataObj = new File({
            _id: uniqueId,
            name,
            tags,
            email,
            size: videofile.size,
            fileUrl: `${path2.split('/').pop()}`,
            isVideo: true,
            comments: []
        });
        const data = await dataObj.save();
        res.json({
            data: data,
            success: true,
            message: "Video Successfully uploaded"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "Something went wrong at video upload"
        });
    }
};
// get all images in DB
export const getAllVideos = async (req, res) => {
    try {
        const videosData = await File.find({ isVideo: true }); //only videos no images
        res.status(200)
            .json({
            success: true,
            data: videosData,
            message: "All Videos fetched suucessfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "server error at getAllVideos"
        });
    }
};
// Delete Video
export const deleteVideo = async (req, res) => {
    const videoId = req.params.id;
    try {
        const video = await File.findById(videoId);
        if (!video) {
            return res.status(404)
                .json({
                success: false,
                message: "video not found"
            });
        }
        let videoPath = path.join(__dirname, '../files', video.fileUrl.toString());
        console.log(videoPath);
        // delete from folder
        fs.unlinkSync(videoPath);
        // delete record from DB
        await File.findByIdAndDelete(videoId);
        res.status(200)
            .json({
            success: true,
            message: "Video Deleted Succesfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "Server Error while deleting video"
        });
    }
};
// ---------------------------------------COMMENTS----------------------------------------------------------
// Add new main comment
export const addComment = async (req, res) => {
    try {
        const { videoId, text, user } = req.body;
        const video = await File.findById(videoId);
        if (!video) {
            return res.status(404)
                .json({
                success: false,
                message: "Video not fonud"
            });
        }
        video.comments.push({
            text,
            user,
            timestamp: Date.now()
        });
        const updateVideo = await video.save();
        res.json({
            success: true,
            data: updateVideo,
            message: "Comment added successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "Server error at add comment"
        });
    }
};
// Add reply to main comment
export const addReply = async (req, res) => {
    try {
        const { videoId, commentId, text, user } = req.body;
        const video = await File.findById(videoId);
        if (!video) {
            return res.status(404)
                .json({
                success: false,
                message: "Video not found"
            });
        }
        const comment = video.comments.id(commentId);
        if (!comment) {
            return res.status(404)
                .json({
                success: false,
                message: "Comment not found"
            });
        }
        comment.replies?.push({
            text,
            user,
            timestamp: Date.now(),
        });
        const updatedVideo = await video.save();
        res.json({
            success: true,
            data: updatedVideo,
            message: "Reply added successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "Server error at add reply"
        });
    }
};
// fetch all comments
export const getcomments = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const video = await File.findById(videoId);
        if (!video) {
            return res.status(404)
                .json({
                success: false,
                message: "Video not found"
            });
        }
        const comments = video.comments || [];
        res.status(200)
            .json({
            success: true,
            data: comments,
            message: "Comments feteched succesfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            message: "Server error at getcomments"
        });
    }
};
