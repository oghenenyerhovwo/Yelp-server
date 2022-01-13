// modules
import express from "express"
import expressAsyncHandler from "express-async-handler"

// module set up
const router = express.Router();

// functions and middleware

// objects  and arrays
import Campground from "../models/campgroundModel.js";
import Comment from "../models/commentModel.js";
import { isAuth,isUserAuthor,isUserAdmin, isAuthorAdmin, isAuthorSuperAdmin } from "../utils.js";

// routers ********************************

// post comment
router.post(
    "/:campgroundId/comments", 
    isAuth,
    expressAsyncHandler(async (req, res) => {        
        const {campgroundId} = req.params
        const newComment={...req.body, author: req.user._id}
        Comment
            .create(newComment)
            .then(async createdComment  => {
                const foundCampground = await Campground.findById(campgroundId)
                if(foundCampground)  {
                    foundCampground.comments.push(createdComment._id)
                    foundCampground
                        .save()
                        .then(campground => res.send(campground))
                        .catch(err => res.status(404).send(err))
                }  else {
                    res.status(404).send({message: "campground not found"})
                }
            })
            .catch(err => res.status(404).send(err))
    })
);

// get all comment
router.get(
    "/:campgroundId/comments",
    expressAsyncHandler(async (req, res) => {   
        const {campgroundId} = req.params
        const foundCampground= await Campground.findById(campgroundId)
        if(foundCampground){
            const allComments= await Comment.find().populate("author")
            const campgroundComments= []
            allComments.forEach(comment => {
                foundCampground.comments.forEach(campgroundId => {
                    if (JSON.stringify(campgroundId) == JSON.stringify(comment._id)){
                        campgroundComments.push(comment)
                    }
                })
            })
            res.send(campgroundComments)
        }else {
            res.status(404).send({message: "campground not found"})
        }
    })
);

// delete comment
router.delete(
    "/:campgroundId/comments/:commentsId",
    isAuth, 
    expressAsyncHandler(async (req, res) => {        
        const {campgroundId, commentsId} = req.params
        
        const foundCampground= await Campground.findById(campgroundId).populate("comments")
        if(foundCampground)  {
            const foundComment= await Comment.findById(commentsId).populate("author")
            if(foundComment){
                const authorRole = foundComment.author.role
                const authorId = foundComment.author._id
                const userRole = req.user.role
                const userId = req.user._id
                // if the owner of the campground is an admin or superAdmin only the owner shouldbe capable
                if((isAuthorAdmin(authorRole) || isAuthorSuperAdmin(authorRole)) && !isUserAuthor(userId, authorId)){
                    return res.status(404).send({message: "You need to be the owner to do that"})
                } // if the owner is not an admin, only the owner and the admin should be capable
                else if(!isUserAuthor(userId, authorId) && !isUserAdmin(userRole)){
                    return res.status(404).send({message: "You need to be the owner or an admin to do that"})
                }
                const updateComment= foundCampground.comments.filter(id => id != commentsId)
                foundCampground.comments= updateComment
                foundCampground
                    .save()
                    .then(() => {
                        Comment
                            .findByIdAndRemove(commentsId)
                            .then(() => res.send(commentsId))
                            .catch(err => res.status(404).send(err))
                    })  
                    .catch(err => res.status(404).send(err))
            }
        }  else {
            res.status(404).send({message: "campground not found"})
        }
    })
);




export default router