import { NotificationType } from "@common/notification/NotificationType";
import { IReviewPayload } from "@common/review/ContentReview";
import {
  AbstractNotification,
  INotification,
  INotificationResponse,
} from "../../lib/models/abstractNotification";
import { v4 as uuidv4 } from "uuid";

export class ReviewNotification extends AbstractNotification {
  constructor(data: INotification<string>) {
    super(data);
  }

  public static New(
    ownerUid: string,
    senderUid: string,
    reviewPayload: IReviewPayload
  ): ReviewNotification {
    return new ReviewNotification({
      uid: uuidv4(),
      type: NotificationType.ReviewNotification,
      payload: reviewPayload,
      ownerUid,
      senderUid,
      isRead: false,
      createdAt: Date.now(),
    });
  }

  public genResponse(): Promise<INotificationResponse | null> {
    throw new Error("Method not implemented.");
  }

  public toINotification(): INotification<string> {
    throw new Error("Method not implemented.");
  }
}
