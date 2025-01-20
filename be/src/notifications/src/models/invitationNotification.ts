import { NotificationType } from "@common/notification/NotificationType";
import { IInivitationPayload } from "@common/invitation/InvitationPayload";
import {
  AbstractNotification,
  INotification,
  INotificationResponse,
} from "../../lib/models/abstractNotification";
import { v4 as uuidv4 } from "uuid";

export class InvitationNotification extends AbstractNotification {
  constructor(data: INotification<string>) {
    super(data);
  }

  public static New(
    ownerUid: string,
    senderUid: string,
    invitationPayload: IInivitationPayload
  ): InvitationNotification {
    return new InvitationNotification({
      uid: uuidv4(),
      type: NotificationType.InviteUserNotification,
      payload: invitationPayload,
      ownerUid,
      senderUid,
      isRead: false,
      createdAt: Date.now(),
    });
  }

  genResponse = async (): Promise<INotificationResponse | null> => {
    return {
      notification: this,
    }
  }

  public toINotification(): INotification<string> {
    return {
      uid: this.uid,
      type: this.type,
      ownerUid: this.ownerUid,
      senderUid: this.senderUid,
      isRead: this.isRead,
      createdAt: this.createdAt,
      payload: this.payload,
    }
  }
}
