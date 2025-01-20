import { IInivitationPayload } from "@common/invitation/InvitationPayload";
import { NotificationService } from "../../lib/services/notification.service";
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
        const invitationPayload : IInivitationPayload = {
            inviterUid,
            inviterName,
            businessUid,
            businessName,
            message,
        };
        const notification = InvitationNotification.New(
            ownerUid,
            this.viewerId,
            invitationPayload,
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
