import MockIds from "@/mock/mockIds";
import { 
  ExampleNotificationFrameworkClient as client,
} from "../clients/notificationClient";
import {
  NotificationService,
} from "../notifications/lib/services/notification.service";

export class NotificationServiceFetcher {
  private readonly viewerUid: string;
  constructor(userId: string) {
    this.viewerUid = userId;
  }

  async fetchNotificationService(): Promise<NotificationService> {
    const notifFramework = await client.getInstanceX();
    return notifFramework.getNotificationServiceX(
      this.viewerUid,
    );
  }
}
