import express from "express";
import {
  NotificationServiceFetcher
} from "../../utils/notificationFetcher";

const notificationRouter = express.Router();

notificationRouter.get("/:viewerUid", async (req, res) => {
  try {
    const { viewerUid } = req.params; // ideally should come from the request like idToken
    const notificationService = await new NotificationServiceFetcher(
      viewerUid,
    ).fetchNotificationService();
    const notificationResponses = await notificationService.genFetchAllResponseForUserX(0);
    return res.status(200).json({
      notifications: notificationResponses
    });
  } catch (error) {
    console.error("Failed to fetch notifications", error);
    return res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
});

notificationRouter.post("/markAllAsRead", async (req, res) => {
  try {
    /**
     * @viewerUid : should ideally come from the request object, something like idToken
     */
    const viewerUid = req.body;
    const notificationService = await new NotificationServiceFetcher(
      viewerUid,
    ).fetchNotificationService();
    await notificationService.genMarkAllAsReadX();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to mark notifications read",
    });
  }
});

notificationRouter.post("/:uuid/markAsRead", async (req, res) => {
  try {
    /**
     * @viewerUid : should ideally come from the request object, something like idToken
     */
    const viewerUid = req.body;
    const { uuid } = req.params;
    if (!uuid) {
      return res.status(400).json({
        error: "Notification ID is required",
      });
    }
    const notificationService = await new  NotificationServiceFetcher(
      viewerUid,
    ).fetchNotificationService();
    await notificationService.genMarkAsReadX(uuid);
    return res.status(200).json({
      message: "Notification marked as read",
    });
  } catch (error) {
    return res.status(500).json({ 
      error: "Failed to mark notification as read",
    });
  }
});

export default notificationRouter;
