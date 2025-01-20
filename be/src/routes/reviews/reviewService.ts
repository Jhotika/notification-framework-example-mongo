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
    try {
      // Convert reviewStatus to the enum value, ensuring case-insensitivity and validity
      const review = ReviewStatus[reviewStatus.toUpperCase() as keyof typeof ReviewStatus];
      if (!review) {
        console.error(`Invalid review status: ${reviewStatus}`);
        return;
      }
  
      if (!this.notificationService) {
        console.warn('Notification service is not available');
        return true;
      }
  
      // Initialize the review notification service
      const reviewNotifService = ReviewNotificationService.fromNotificationService(
        this.notificationService
      );
  
      // Mocked content identifiers and name
      const contentUid = "Awesome-content-uid";
      const contentName = "Awesome content";
  
      // Determine the message based on the review status
      const message =
        review === ReviewStatus.APPROVED
          ? `Your content "${contentName}" has been approved`
          : `Your content "${contentName}" has been rejected`;
          
      // Create the notification
      await reviewNotifService.genCreateNotification(
        ownerUid,
        contentUid,
        contentName,
        review,
        message,
      );
    } catch (e) {
      console.error(`Failed to create notification for user ${this.viewerUid}:`, e);
    }
  }  
}