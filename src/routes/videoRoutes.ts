import express from 'express';
import { videoUpload, uploadVideoToCloudinary, likeVideo, dislikeVideo } from '../controllers/videoController';
import{getAllShorts, getAllVideos,getEntairVideos,getVideoById,getEntairShorts,UpdateVideoByID, UpdateShortsByID, getShortsById, createChannel, imageUpload, getChannels, getChannelsByName}from "../controllers/chanalController"
import { CreatUser,getAllUsers, getSubscribersCount, getUserById, subscriberChannel} from '../controllers/userController';
const router = express.Router();

router.post('/videos/upload', videoUpload, uploadVideoToCloudinary);
router.get('/videos',getAllVideos)
router.get("/shorts",getAllShorts)
router.get("/EntairVideos",getEntairVideos)
router.get("/entaireShorts",getEntairShorts)
router.get("/video/:videoId",getVideoById)

router.post("/users",CreatUser)
router.get("/getUserById/:uid",getUserById)
router.get('/getallusers',getAllUsers)
router.put('/updateVideoDetails/:videoId', UpdateVideoByID);
router.put('/updateShortsDetails/:shortsId', UpdateShortsByID);
router.get("/short/:shortsId", getShortsById);
router.post('/create-channel', imageUpload, createChannel);
router.post('/subscribChannel',subscriberChannel)
router.post('/getSubscribersCount',getSubscribersCount)
router.post('/likeVideo',likeVideo)
router.post('/dislikeVideo',dislikeVideo)
router.get("/getchannel",getChannels)
router.get("/getChannelsByName",getChannelsByName)
export default router;
