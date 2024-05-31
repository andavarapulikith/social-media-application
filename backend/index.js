import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors';
import AuthRoute from './routes/AuthRoute.js';
import userroute from './routes/userroute.js';
import postroute from './routes/postroute.js';
import uploadroute from './routes/uploadroute.js'
const app = express();




app.use(express.static('public'));
app.use('/images',express.static("images"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
dotenv.config()







mongoose
  .connect(
    process.env.mongodburl,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongodb connected");
    app.listen(process.env.PORT, () => {
      console.log("connected to port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/auth',AuthRoute);
app.use('/user',userroute);
app.use('/posts',postroute);
app.use('/upload',uploadroute);

