import MockIds from "@/mock/mockIds";
import { ExampleNotificationFrameworkClient as client } from "../clients/notificationClient";
import { NotificationService } from "../notifications/lib/services/notification.service";
import { UserNotificationMetadataService } from "../notifications/lib/services/userNotificationMetadata.service";

export class NotificationServiceFetcher {
  private readonly userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }

  fromUserUid(userId: string): NotificationServiceFetcher {
    return new NotificationServiceFetcher(userId);
  }

  async fetchNotificationService(): Promise<NotificationService> {
    console.log("Fetching notification service for user", this.userId);
    const notifFramework = await client.getInstanceX();
    return notifFramework.getNotificationServiceX(
      MockIds.getInstance().ownerUid1,
    );
  }

  async fetchUserNotificationMetadataService(): Promise<UserNotificationMetadataService> {
    const notifFramework = await client.getInstanceX();
    return notifFramework.getUserNotificationMetadataServiceX(this.userId);
  }
}
