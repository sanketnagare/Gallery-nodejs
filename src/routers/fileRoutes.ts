import express from 'express';
import {addComment, addReply, deleteImage, deleteVideo, getAllImages, getAllVideos, getcomments, localFileUpload, localVideoUpload} from '../controllers/fileUpload.js'
import { downloadImage, downloadVideo } from '../controllers/fileDownload.js';
const router = express.Router();

router.post("/localfileupload", localFileUpload);
router.post("/videoupload", localVideoUpload);


router.get("/getallimages", getAllImages);
router.get("/getallvideos", getAllVideos);
router.get("/getcomments/:videoId", getcomments);


router.get("/downloadimage/:filename", downloadImage);
router.get("/downloadvideo/:filename", downloadVideo);


router.post("/comment", addComment);
router.post("/reply", addReply);


router.post("/deleteimage/:id", deleteImage);
router.post("/deletevideo/:id", deleteVideo);

export default router;


