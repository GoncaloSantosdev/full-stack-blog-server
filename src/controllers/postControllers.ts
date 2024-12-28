import { Request, Response } from "express";
// Models
import Post from "../models/Post";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const post = await Post.create({
      title,
      description,
    });

    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new Error("Post not found");
    }

    const post = await Post.findById(postId);

    res.status(200).json({
      status: "success",
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new Error("Post not found");
    }

    const { title, description } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { title, description },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new Error("Post not found");
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
