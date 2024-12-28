import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postControllers";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);
router.route("/:postId").get(getPostById).put(updatePost).delete(deletePost);

export default router;
