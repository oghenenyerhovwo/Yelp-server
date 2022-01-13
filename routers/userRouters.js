// modules
import express from "express"
import expressAsyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"

// module set up
const router = express.Router();

// functions and middleware
import  { generateToken } from "../utils.js"
import { isAuth, isUserSuperAdmin } from "../utils.js";


// objects  and arrays
import data from "../data.js";
import User from "../models/userModel.js";

// routers

// seed Database
router.get(
    "/seed", 
    expressAsyncHandler((req, res) => {
        User
            .deleteMany({})
            .then(() => {
                User
                    .create(data.users)
                    .then(createdUsers => res.send(createdUsers))
                    .catch(err => console.log(err))
            })
            
    })
);

// sign in user
router.post(
    "/signin", 
    expressAsyncHandler(async(req, res) => {
       const {email, password} = req.body
       const foundUser = await User.findOne({email})
       if(foundUser){
            if(bcrypt.compareSync(password, foundUser.password)){
                res.send({
                    _id: foundUser._id,
                    name: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role,
                    token: generateToken(foundUser)
                })
                return;
            } else {
                res.status(401).send({message: "Password is incorrect"})
                return;
            }
       } else {
           res.status(401).send({message: "User does not exist"})
       }
    }
));

// register user
router.post(
    "/register", 
    expressAsyncHandler(async(req, res) => {
       const foundUser = await User.findOne({email: req.body.email})
       if(!foundUser){
            const newUser= {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 8)
            }
            User
                .create(newUser)
                .then(createdUser => res.send({
                    _id: createdUser._id,
                    name: createdUser.name,
                    email: createdUser.email,
                    role: createdUser.role,
                    token: generateToken(createdUser)
                }))
       } else {
           res.status(401).send({message: "User already exist"})
       }
    }
));


// get all users
router.get(
    "/",
    isAuth, 
    isUserSuperAdmin,
    expressAsyncHandler(async(req, res) => {
       User
            .find()
            .then(users => res.send(users))
    }
));

// change user role
// get all users
router.put(
    "/:id/role",
    isAuth, 
    isUserSuperAdmin,
    expressAsyncHandler(async(req, res) => {
       const foundUser= User.findById(req.params.id)
       if(foundUser){
            User
                .findByIdAndUpdate(req.params.id, req.body, {new:true})
                .then(updatedUser => res.send(updatedUser))
       }else{
            res.status(404).send({message : "User does not exist"})
    }
    }
));

export default router