import { ReviewNotification } from "../models/reviewNotification";
import { NotificationService } from "../../lib/services/notification.service";
import { ReviewStatus } from "@common/review/ContentReview";
import { InvitationNotification } from "../models/invitationNotification";

export class InvitationNotificationService extends NotificationService {
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
    ): InvitationNotificationService => {
        return new InvitationNotificationService(notificationService);
    };

    async genCreateNotification(
        ownerUid: string,
        inviterUid : string,
        inviterName : string,
        businessUid: string,
        businessName: string,
        message: string,
    ): Promise<void> {
        const notification = InvitationNotification.New(
            ownerUid,
            this.viewerId,
            {
                inviterUid,
                inviterName,
                businessUid,
                businessName,
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
