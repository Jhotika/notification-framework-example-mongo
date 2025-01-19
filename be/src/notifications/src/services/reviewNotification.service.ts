import { IReviewNotification, ReviewNotification } from "../models/reviewNotification";
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

    static fromNotificationService = (notificationService: NotificationService): ReviewNotificationService => {
        return new ReviewNotificationService(notificationService);
    };

    async genCreateNotification(
        ownerId: string,
        contentUid: string,
        contentName: string,
        status: ReviewStatus
    ): Promise<void> {
        const notification: IReviewNotification = ReviewNotification.New(
            ownerId,
            this.viewerId,
            `Your content "${contentName}" has been ${status}ed`,
            {
                reviewerUid: this.viewerId,
                reviewerName: "John Doe",
                contentUid,
                contentName,
                status
            }
        );
        
        try {
            await this.genSave(notification);
        } catch (error) {
            console.log(error);
        }
    }
}