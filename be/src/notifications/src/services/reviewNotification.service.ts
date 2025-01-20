import { ReviewNotification } from "../models/reviewNotification";
import { NotificationService } from "../../lib/services/notification.service";
import { ReviewStatus } from "@common/review/ContentReview";

export class ReviewNotificationService extends NotificationService {
    private constructor(parent: NotificationService) {
        super(
            parent.viewerId,
            parent.notificationRepository,
            parent.userNotificationMetadataRepository,
            parent.notificationClasses,
            parent.logger
        );
    }
    
    static fromNotificationService = (
        notificationService: NotificationService,
    ): ReviewNotificationService => {
        return new ReviewNotificationService(notificationService);
    };

    async genCreateNotification(
        ownerId: string,
        contentUid: string,
        contentName: string,
        status: ReviewStatus,
        message: string,
    ): Promise<void> {
        const notification = ReviewNotification.New(
            ownerId,
            this.viewerId,
            {
                reviewerUid: this.viewerId,
                reviewerName: "John Doe",
                contentUid,
                contentName,
                status,
                message,
            }
        );
        try {
            await this.genSave(notification);
        } catch (error) {
            console.error(
                "Failed to create review notification", error,
            );
        }
    }
}