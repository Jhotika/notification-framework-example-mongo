import MockIds from "@/mock/mockIds";
import express from "express";
import { InvitationService } from "./invitationService";

const invitationRouter = express.Router();

invitationRouter.post("/", async (req, res) => {
    const {
        ownerUid,
        inviterUid,
        inviterName,
        businessUid,
        businessName,
        message,
    } = req.body;
    try {
        const mockIds = MockIds.getInstance();
        // Viewer Uid(sender of the notif) would ideally come from the request
        const viewerUid = mockIds.viewerUid1;
        const invitationService = await InvitationService.withNotificationService(
            viewerUid,
        );
        await invitationService.genInviteUserToBusinessX(
            ownerUid,
            inviterUid,
            inviterName,
            businessUid,
            businessName,
            message,
        );
        res.status(201).json({
            message: "Invitation created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the invitation",
        });
    }
});

export default invitationRouter;