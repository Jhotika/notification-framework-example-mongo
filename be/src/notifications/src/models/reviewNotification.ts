import { NotificationType } from "@common/notification/NotificationType";
import { IReviewPayload } from "@common/review/ContentReview";
import { 
    AbstractNotification,
    INotification,
    INotificationResponse
} from "../../lib/models/abstractNotification";
import { v4 as uuidv4 } from "uuid";

export interface IReviewNotification extends INotification<string> {
    message: string;
    reviewPayload: IReviewPayload;
}

export interface IReviewNotificationResponse extends INotificationResponse {
    senderUid: string;
    message: string;
    reviewPayload: IReviewPayload;
}

export class ReviewNotification extends AbstractNotification implements IReviewNotification {
    public message: string;
    public reviewPayload: IReviewPayload;
    constructor(data: IReviewNotification) {
        super(data);
        this.message = data.message;
        this.reviewPayload = data.reviewPayload;
    }
    static New = (
        ownerUid: string,
        senderUid: string,
        message: string,
        reviewPayload: IReviewPayload
    ): ReviewNotification => {
        return new ReviewNotification({
            uid: uuidv4(),
            type: NotificationType.ReviewNotification,
            payload: {},
            ownerUid,
            senderUid,
            message,
            reviewPayload,
            isRead: false,
            createdAt: Date.now(),
        });
    };
    
    genResponse = async (): Promise<IReviewNotificationResponse | null> => {
        return {
            notification: this,
            senderUid: this.senderUid,
            message: this.message,
            reviewPayload: this.reviewPayload
        };
    };

    public toINotification(): INotification<string> {
        return {
            uid: this.uid,
            type: this.type,
            payload: this.payload,
            ownerUid: this.ownerUid,
            senderUid: this.senderUid,
            isRead: this.isRead,
            createdAt: this.createdAt,
        };
    }
}
