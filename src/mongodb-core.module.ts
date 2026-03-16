import {
    Global,
    Module,
    type DynamicModule,
    type FactoryProvider,
    type OnApplicationShutdown
} from '@nestjs/common';
import type {MongodbOptions} from './mongodb.types';
import {Db, MongoClient} from 'mongodb';

@Global()
@Module({
    imports: [],
    providers: []
})
export class MongodbCoreModule implements OnApplicationShutdown{

    /**
     * @return {DynamicModule}
     */
    public static forRoot(options: MongodbOptions): DynamicModule{
        const mongoClientProvider = MongodbCoreModule.createMongoClientProvider(options),
            dbProvider = MongodbCoreModule.createDbProvider();

        return {
            module: MongodbCoreModule,
            imports: [],
            providers: [
                mongoClientProvider,
                dbProvider
            ],
            exports: [
                mongoClientProvider,
                dbProvider
            ]
        };
    }

    /**
     * @param {MongodbOptions} options
     * @return {FactoryProvider}
     * @private
     */
    private static createMongoClientProvider(options: MongodbOptions): FactoryProvider{
        let client: MongoClient|null = null;

        return {
            provide: MongoClient,
            useFactory: async () => {
                if(client)
                    return client;

                client = new MongoClient(`mongodb://${options.host}:${options.port}/${options.db}`, options.clientOptions);
                if(options.autoConnect)
                    await client.connect();

                return client;
            }
        };
    }

    /**
     * @return {FactoryProvider}
     * @private
     */
    private static createDbProvider(): FactoryProvider{
        let db: Db|null = null;

        return {
            provide: Db,
            useFactory: (client: MongoClient) => {
                if(!db)
                    db = client.db();

                return db;
            },
            inject: [MongoClient]
        };
    }

    /**
     * @param {MongoClient} client
     */
    public constructor(private readonly client: MongoClient) {}

    /**
     * @return {Promise<void>}
     */
    public async onApplicationShutdown(): Promise<void>{
        if(this.client)
            await this.client.close();
    }

}
