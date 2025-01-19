import { NotificationFramework } from "../notifications/lib";
import { Logger } from "../notifications/lib/logger";
import { NotificationFrameworkBuilder } from "../notifications/lib/notificationFramework.builder";
import { NotificationMongoClient } from "../mongo/index";
import { ReviewNotification } from "@/notifications/src/models/reviewNotification";

export class ExampleNotificationFrameworkClient{
    static instance: NotificationFramework;
    static async getInstanceX() {
        const mongoClient = await NotificationMongoClient.genGetInstanceX();
        const mongoConfig = mongoClient.getNotificationCollectionsConfig();
        if (!ExampleNotificationFrameworkClient.instance) {
            const framework = new NotificationFrameworkBuilder()
                .withLogger(new Logger())
                .withMongoCollectionConfig(mongoConfig)
                .withConcreteNotificationClasses(
                    [
                        ReviewNotification,
                    ]
                );
            ExampleNotificationFrameworkClient.instance = framework.buildX();
        }
        return ExampleNotificationFrameworkClient.instance;
    };
}