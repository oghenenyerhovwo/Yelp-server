// Requiring node modules
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// importing functions
import databaseConnection from "./connections/dbConnection.js"; 

// importing routers
import campgroundRouter from "./routers/campgroundRouter.js";
import commentRouter from "./routers/commentRouter.js";
import userRouter from "./routers/userRouters.js";
import fileRouter from "./routers/fileRouter.js";

// Initializing imported functions
dotenv.config()
const app = express();
databaseConnection()

// middle-wares
app.use(cors())
app.use(express.json())


// router implementations
app.use("/api/campgrounds/", campgroundRouter)
app.use("/api/campgrounds/", commentRouter)
app.use("/api/files/", fileRouter)
app.use("/api/users/", userRouter)

app.get("/", (req, res) => {
  res.send("Server is running")
});

// middleware
// app.use((err, req,res,next) => {
//   res.status(505).send({message: err.message})
//   // next()
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`YelpCamp server is running at http://localhost:${port}`)
})
