import postmodel from "../models/postmodel.js";

import mongoose from "mongoose";
import usermodel from "../models/usermodel.js";


export const createpost=async (req,res)=>{
    const newpost=new postmodel(req.body);
    try{
      await newpost.save();
      res.status(200).json(newpost);
    }
    catch(err)
    {
       res.status(500).json(err);
    }
 

}

export const getPost = async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await postmodel.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // Update a post
  export const updatePost = async (req, res) => {
    const postid = req.params.id;
    const { userid } = req.body;
  
    try {
      const post = await postmodel.findById(postid);
      if (post.userid === userid) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
   
  // Delete a post
  export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userid } = req.body;
  
    try {
      const post = await postmodel.findById(id);
      if (post.userid === userid) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // like/dislike a post
  export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userid } = req.body;
  
    try {
      const post = await postmodel.findById(id);
     
      if (!post.likes.includes(userid)) {
        await post.updateOne({ $push: { likes: userid } });
     
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userid } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // Get Timeline POsts
  export const getTimelinePosts = async (req, res) => {
    const userid = req.params.id;
  
    try {
      const currentUserPosts = await postmodel.find({ userid: userid });
      const followingPosts = await usermodel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userid),
          },
        },
        {
          $lookup: {
            from: "postmodels",
            localField: "following",
            foreignField: "userid",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res
        .status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        );
    } catch (error) {
      res.status(500).json(error);
    }
  };
