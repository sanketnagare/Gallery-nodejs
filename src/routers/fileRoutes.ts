import express from 'express';
import {addComment, addReply, deleteImage, deleteVideo, getAllImages, getAllVideos, getcomments, localFileUpload, localVideoUpload} from '../controllers/fileUpload.js'
const router = express.Router();

router.post("/localfileupload", localFileUpload);
router.post("/videoupload", localVideoUpload);


router.get("/getallimages", getAllImages);
router.get("/getallvideos", getAllVideos);


router.post("/comment", addComment);
router.post("/reply", addReply);
router.get("/getcomments/:videoId", getcomments);


router.post("/deleteimage/:id", deleteImage);
router.post("/deletevideo/:id", deleteVideo);

export default router;


