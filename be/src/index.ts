import express from "express";
import notificationsRouter from "./routes/notifications/index";
import reviewRouter from "./routes/reviews/index";
import { NotificationMongoClient } from "./mongo/index";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import invitationRouter from "./routes/invitation";

dotenv.config();

const PORT = 8000;
const app = express();
NotificationMongoClient.init();

app.use(cors());
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true })); 

app.use("/notifications", notificationsRouter);
app.use("/reviews", reviewRouter);
app.use("/invitations", invitationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
