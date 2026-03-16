import type {MongoClientOptions} from 'mongodb';

export type MongodbOptions = {
    host: string;
    port: number;
    db: string;
    clientOptions?: MongoClientOptions;
    autoConnect?: boolean;
};
