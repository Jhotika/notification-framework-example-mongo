import { ExampleNotificationFrameworkClient } from "@/clients/notificationClient";
import MockIds from "@/mock/mockIds";
import { NotificationService } from "@/notifications/lib";
import { ReviewNotificationService } from "@/notifications/src/services/reviewNotification.service";
import { ReviewStatus } from "@common/review/ContentReview";

export interface IWithMaybeNotificationService<T extends NotificationService> {
  readonly notificationService: T | null;
}

export class ReviewService
  implements IWithMaybeNotificationService<NotificationService>
{
  constructor(
    public viewerUid: string,
    public notificationService: NotificationService | null
  ) {}

  static withNotificationService = async (
    viewerUid: string
  ): Promise<ReviewService> => {
    const notif = await ExampleNotificationFrameworkClient.getInstanceX();
    const notifService = notif.getNotificationServiceX(viewerUid);
    return new ReviewService(
        viewerUid,
        notifService,
    );
  };

  async genCreateReviewX(
    ownerUid: string,
    reviewStatus: string,
  ) {
    const review = reviewStatus as ReviewStatus;
    try {
      if (!this.notificationService) {
        return true;
      } else {
        const notifService = ReviewNotificationService.fromNotificationService(
          this.notificationService
        );

        // ownerUid - user that'll receive the notification,in this case the creator of the content
        // contentName - name of the content that was reviewed
        // both values should come from the relevant service class/method
        const contentUid = "Awesome-content-uid";
        const contentName = "Awesome content";
        await notifService.genCreateNotification(
          ownerUid,
          contentUid,
          contentName,
          review
        );
      }
    } catch (e) {
      console.error(`Failed to create notification for user ${this.viewerUid}`);
    }
  }
}
