import express from "express";
const app = express();

import { google } from "googleapis";
import apiRouter from "./routes.js";
app.use("/rest/v1/calender", apiRouter);
const { OAuth2 } = google.auth;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up OAuth client credentials
const oAuth2Client = new OAuth2(
  "456724647220-o5vr0hapn6noo8dmo6ooamukojkpkb1i.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/rest/v1/calender/redirect"
);

app.listen(3000, () => console.log("server running on http://localhost:3000"));
