import { ReviewNotification } from "../models/reviewNotification";
import { NotificationService } from "../../lib/services/notification.service";
import { ReviewStatus } from "@common/review/ContentReview";
import { INotification } from "../../lib/models/abstractNotification";

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
        status: ReviewStatus
    ): Promise<void> {
        const notification: INotification = ReviewNotification.New(
            ownerId,
            this.viewerId,
            {
                reviewerUid: this.viewerId,
                reviewerName: "John Doe",
                contentUid,
                contentName,
                status,
                message: `Your content "${contentName}" has been ${status}ed`
            }
        );
        try {
            await this.genSave(notification);
        } catch (error) {
            console.log(error);
        }
    }
}