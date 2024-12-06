import express from 'express';
import {addComment, deleteComment,getCommentsById} from "../controllers/commentController"


const router = express.Router();

router.post("/addComment/:videoId",addComment)
router.delete("/deleteComment/:id",deleteComment)
router.get("/getCommentsById/:videoId", getCommentsById);
export default router