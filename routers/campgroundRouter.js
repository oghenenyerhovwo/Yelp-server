// modules
import express from "express"
import expressAsyncHandler from "express-async-handler"

// module set up
const router = express.Router();

// functions and middleware

// objects  and arrays
import data from "../data.js";
import Comment from "../models/commentModel.js";
import Campground from "../models/campgroundModel.js";
import { isAuth,isUserAuthor,isUserAdmin, isAuthorAdmin, isAuthorSuperAdmin } from "../utils.js";

// routers

// seed Database
router.get(
    "/seed", 
    expressAsyncHandler((req, res) => {
        Campground
            .deleteMany({})
            .then(() => {
                Campground
                    .create(data.campgrounds)
                    .then(createdCampgrounds => res.send(createdCampgrounds))
                    .catch(err => console.log(err))
            })
            
    })
);

router.get(
    "/destroy", 
    expressAsyncHandler((req, res) => {
        Campground
            .deleteMany({})
            .then(() => {res.send("deleted all")})
            
    })
);

// get all campgrounds
router.get(
    "/", 
    expressAsyncHandler((req, res) => {
        Campground
            .find()
            .then(campgrounds => res.send(campgrounds))
            .catch(err => res.status(404).send(err))
            
    })
);

// create campground
router.post(
    "/", 
    isAuth,
    expressAsyncHandler((req, res) => {
        Campground
            .create({...req.body, author:req.user._id})
            .then(campground => res.send(campground))
            .catch(err => res.status(404).send(err))
            
    })
);

// get detail of campground
router.get(
    "/:id", 
    expressAsyncHandler(async (req, res) => {
        const campgroundId= req.params.id
        const foundCampground=await Campground.findById(campgroundId)
        if(foundCampground){
            Campground
                .findById(campgroundId).populate("author").populate("comments")
                .then(campground => res.send(campground))
                .catch(err => res.status(404).send(err))
        } else {
            res.status(404).send({message: "Campground not found"})
        }
        
            
    })
);

// update detail of campground
router.put(
    "/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const campgroundId= req.params.id
        const foundCampground=await Campground.findById(campgroundId).populate("author")
        const userId= req.user._id
        const authorId= foundCampground.author._id
        // check if the current user owns the campground
        if(!isUserAuthor(userId, authorId)){
            return res.status(404).send({message: "You need to be the owner or an admin to do that"})
        }
        if(foundCampground){
            Campground
                .findByIdAndUpdate(campgroundId, req.body)
                .then(updatedCampground => res.send(updatedCampground))
                .catch(err => res.status(404).send(err))
        } else {
            res.status(404).send({message: "Campground not found"})
        }
        
            
    })
);

// delete detail of campground
router.delete(
    "/:id", 
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const campgroundId= req.params.id
        const foundCampground=await Campground.findById(campgroundId).populate("author")
        const authorRole= foundCampground.author.role
        const authorId= foundCampground.author._id
        const userRole= req.user.role
        const userId= req.user._id
        // user should not delete this campground, if
        // if the owner of the campground is an admin or superAdmin only the owner shouldbe capable
        if((isAuthorAdmin(authorRole) || isAuthorSuperAdmin(authorRole)) && !isUserAuthor(userId, authorId)){
            return res.status(404).send({message: "You need to be the owner to do that"})
        } // if the owner is not an admin, only the owner and the admin should be capable
        else if(!isUserAuthor(userId, authorId) && !isUserAdmin(userRole)){
            return res.status(404).send({message: "You need to be the owner or an admin to do that"})
        }
        if(foundCampground){
            foundCampground.comments.forEach(async id => {
                await Comment.findByIdAndDelete(id)
            });
            Campground
                .findByIdAndDelete(campgroundId)
                .then(() => res.send(campgroundId))
                .catch(err => res.status(404).send(err))
        } else {
            res.status(404).send({message: "Campground not found"})
        }
        
        
    })
);

const campgroundRouter= router
export default campgroundRouter