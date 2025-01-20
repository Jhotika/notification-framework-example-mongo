import MockIds from "@/mock/mockIds";
import express from "express";
import { ReviewService } from "./reviewService";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res) => {
    const {
        status,
        ownerId,
    } = req.body;
    try {
        const mockIds = MockIds.getInstance();
        // Viewer Uid(sender of the notif) would ideally come from the request
        const viewerUid = mockIds.viewerUid1;
        const reviewService = await ReviewService.withNotificationService(
            viewerUid,
        );
        await reviewService.genCreateReviewX(
            ownerId,
            status,
        );
        res.status(201).json({
            message: "Review created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the review",
        });
    }
});

export default reviewRouter;
