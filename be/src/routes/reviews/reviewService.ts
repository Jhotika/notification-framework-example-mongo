import { ExampleNotificationFrameworkClient } from "@/clients/notificationClient";
import { NotificationService } from "@/notifications/lib";
import { ReviewNotificationService } from "@/notifications/src/services/reviewNotification.service";
import { ReviewStatus } from "@common/review/ContentReview";

export class ReviewService {
  constructor(
    public viewerUid: string,
    public notificationService: NotificationService | null
  ) {}

  static withNotificationService = async (
    viewerUid: string
  ): Promise<ReviewService> => {
    const notif = await ExampleNotificationFrameworkClient.getInstanceX();
    const notifService = notif.getNotificationServiceX(viewerUid);
    return new ReviewService(viewerUid, notifService);
  };

  async genCreateReviewX(
    ownerUid: string,
    reviewStatus: string
  ) {
    const review = reviewStatus as ReviewStatus;
    try {
      if (!this.notificationService) {
        return true;
      } else {
        /**
         * @todo: Implement review specific logic here
         */

        const reviewNotifService = ReviewNotificationService.fromNotificationService(
          this.notificationService
        );

        // ownerUid - user who will receive the notification (creator of the content)
        const contentUid = "Awesome-content-uid";
        const contentName = "Awesome content";
        await reviewNotifService.genCreateNotification(
          ownerUid,
          contentUid,
          contentName,
          review
        );
      }
    } catch (e) {
      console.error(
        `Failed to create notification for user ${this.viewerUid}`
      );
    }
  }
}