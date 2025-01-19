export enum ReviewStatus {
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export interface IReviewPayload {
    reviewerUid: string;
    reviewerName: string;
    contentUid: string;
    contentName: string;
    status: ReviewStatus;
}
