import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";
const { OAuth2 } = google.auth;
import express from "express";
const apiRouter = express.Router();

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

apiRouter.get("/init", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  res.redirect(authUrl);
});
apiRouter.get("/redirect", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    // Return a list of events
    res.send(events.data.items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default apiRouter;
