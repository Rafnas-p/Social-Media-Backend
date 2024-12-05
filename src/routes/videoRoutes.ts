import express from 'express';
import { videoUpload, uploadVideoToCloudinary } from '../controllers/videoController';
import{getAllShorts, getAllVideos,getEntairVideos,getVideoById,getEntairShorts}from "../controllers/chanalController"
import { CreatUser,getAllUsers } from '../controllers/userController';
const router = express.Router();

router.post('/videos/upload', videoUpload, uploadVideoToCloudinary);
router.get('/videos',getAllVideos)
router.get("/shorts",getAllShorts)
router.get("/EntairVideos",getEntairVideos)
router.get("/entaireShorts",getEntairShorts)
router.get("/video/:videoId",getVideoById)

router.post("/users",CreatUser)
router.get('/getallusers',getAllUsers)
export default router;
