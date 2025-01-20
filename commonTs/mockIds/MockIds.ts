// owner: receiver of the notification
// viewer: sender of the notification
class MockIds {
    public ownerUid1 = "owner__001";
    public ownerUid2 = "owner__002";

    public viewerUid1 = "viewer__0001";

    private static instance: MockIds;
    private constructor() {}
    public static getInstance(): MockIds {
        if (!MockIds.instance) {
            MockIds.instance = new MockIds();
        }
        return MockIds.instance;
    }
}

export default MockIds;
