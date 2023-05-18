import express from "express";
const app = express();
import dotenv from 'dotenv';
dotenv.config();


import { google } from "googleapis";
import apiRouter from "./routes.js";
app.use("/rest/v1/calender", apiRouter);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up OAuth client credentials


app.listen(3000, () => console.log("server running on http://localhost:3000"));
