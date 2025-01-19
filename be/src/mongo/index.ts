import {
  Collection,
  Db,
  MongoClient,
  MongoClientOptions,
  ServerApiVersion,
} from 'mongodb';
import { IMongoCollectionConfig } from 'notifications/lib/configs/db/mongoCollection.config';
import { Logger } from '../notifications/lib/logger';
import { INotification } from 'notifications/lib/models/abstractNotification';

enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  PENDING = 'pending',
}

export class NotificationMongoClient extends MongoClient {
  private static instance: NotificationMongoClient;
  private static connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  private static db: Db;
  private static logger: Logger;

  private constructor(url: string, options: MongoClientOptions) {
    super(url, options);
    NotificationMongoClient.logger = new Logger();
  }

  static init() {
    if (NotificationMongoClient.connectionStatus === ConnectionStatus.DISCONNECTED) {
      NotificationMongoClient.genGetInstanceX().catch((error) => {
        console.error('Error initializing MongoDB client:', error);
      });
    }
  }

  static genGetInstanceX = async () => {
    const mongoClusterUri = process.env.MONGO_DB_URL;
    const prodDb = process.env.MONGO_DB_NAME;
    if (!mongoClusterUri || !prodDb) {
      throw new Error('MongoDB credentials not found');
    }
    if (!NotificationMongoClient.instance) {
      if (NotificationMongoClient.connectionStatus !== ConnectionStatus.PENDING) {
        NotificationMongoClient.connectionStatus = ConnectionStatus.PENDING;
        try {
          NotificationMongoClient.instance = new NotificationMongoClient(mongoClusterUri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            },
          });
          await NotificationMongoClient.instance.connect();
          NotificationMongoClient.connectionStatus = ConnectionStatus.CONNECTED;
          console.log('Connected to MongoDB');
          this.db = NotificationMongoClient.instance.db(prodDb);
        } catch (error) {
          NotificationMongoClient.connectionStatus = ConnectionStatus.DISCONNECTED;
          console.error('Error connecting to MongoDB:', error);
          throw error; // rethrow to ensure callers know the connection failed
        }
      }
    }
    return NotificationMongoClient.instance;
  };

  static getInstanceX = (): NotificationMongoClient => {
    if (!NotificationMongoClient.instance) {
      throw new Error('MongoDB client not initialized');
    }
    return NotificationMongoClient.instance;
  };

  static getDb = (): Db => {
    if (!NotificationMongoClient.db) {
      throw new Error('MongoDB client not initialized');
    }
    return NotificationMongoClient.db;
  };

  static genClose = async () => {
    (await NotificationMongoClient.genGetInstanceX()).close();
    NotificationMongoClient.connectionStatus = ConnectionStatus.DISCONNECTED;
    NotificationMongoClient.logger.info('Closed MongoDB connection');
  };

  get NotificationCollection(): Collection<INotification<string>> {
    const NOTIFICATION_COLLECTION_NAME = 'notifications';
    const collection = NotificationMongoClient.getDb().collection<INotification<string>>(
      NOTIFICATION_COLLECTION_NAME
    );
    collection.createIndex({ createdAt: 1 });
    collection.createIndex({ userId: 1 });
    return collection;
  }

  get UserNotificationMetadataCollection(): Collection {
    const USER_NOTIFICATION_METADATA_COLLECTION_NAME = 'user_notification_metadata';
    const collection = NotificationMongoClient.getDb().collection(
      USER_NOTIFICATION_METADATA_COLLECTION_NAME
    );
    collection.createIndex({ userId: 1 }, { unique: true });
    return collection;
  }

  getNotificationCollectionsConfig() : IMongoCollectionConfig {
    return {
      notificationCollection: this.NotificationCollection,
      userNotificationMetadataCollection: this.UserNotificationMetadataCollection
    };
  };
}
