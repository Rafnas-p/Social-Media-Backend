import express from 'express';
import { videoUpload, uploadVideoToCloudinary } from '../controllers/videoController';
import{getAllShorts, getAllVideos,getEntairVideos,getVideoById,getEntairShorts,UpdateVideoByID, UpdateShortsByID, getShortsById, createChannel}from "../controllers/chanalController"
import { CreatUser,getAllUsers, subscriberChannel, unSubscribeChannel} from '../controllers/userController';
const router = express.Router();

router.post('/videos/upload', videoUpload, uploadVideoToCloudinary);
router.get('/videos',getAllVideos)
router.get("/shorts",getAllShorts)
router.get("/EntairVideos",getEntairVideos)
router.get("/entaireShorts",getEntairShorts)
router.get("/video/:videoId",getVideoById)

router.post("/users",CreatUser)
router.get('/getallusers',getAllUsers)
router.put('/updateVideoDetails/:videoId', UpdateVideoByID);
router.put('/updateShortsDetails/:shortsId', UpdateShortsByID);
router.get("/short/:shortsId", getShortsById);
router.post("/create-channel",createChannel)
router.post('/subscribChannel',subscriberChannel)
router.post('/unsubscriberChannel',unSubscribeChannel)
export default router;
