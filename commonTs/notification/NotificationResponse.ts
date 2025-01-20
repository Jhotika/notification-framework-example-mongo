export interface NotificationResponseBase<T = string> {
  uid: string;
  type: T;
  ownerUid: string;
  senderUid: string;
  isRead: boolean;
  createdAt: number;
  payload: Record<string, any>;
}

export interface NotificationResponse {
  notification: NotificationResponseBase & Record<string, any>;
}
