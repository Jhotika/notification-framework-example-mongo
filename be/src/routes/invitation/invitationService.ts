import { ExampleNotificationFrameworkClient } from "@/clients/notificationClient";
import { NotificationService } from "@/notifications/lib";
import { InvitationNotificationService } from "@/notifications/src/services/invitationNotification.service";

export class InvitationService {
  constructor(
    public viewerUid: string,
    public notificationService: NotificationService | null
  ) {}

  static withNotificationService = async (
    viewerUid: string
  ): Promise<InvitationService> => {
    const notif = await ExampleNotificationFrameworkClient.getInstanceX();
    const notifService = notif.getNotificationServiceX(viewerUid);
    return new InvitationService(viewerUid, notifService);
  };

  async genInviteUserToBusinessX(
    ownerUid: string,
    inviterUid: string,
    inviterName: string,
    businessUid: string,
    businessName: string,
    message: string
  ) {
    try {
      /**
       * @todo: Implement the logic to invite a user to a business
       */
      if (!this.notificationService) {
        console.error("Notification service is not available");
        return;
      }

      const invitationNotifService =
        InvitationNotificationService.fromNotificationService(
          this.notificationService,
        );

        await invitationNotifService.genCreateNotification(
            ownerUid,
            inviterUid,
            inviterName,
            businessUid,
            businessName,
            message,
        );
    } catch (e) {
      console.error(
        `Failed to create notification for user ${this.viewerUid}:`,
        e
      );
    }
  }
}
