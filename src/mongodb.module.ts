import {Module, type DynamicModule} from '@nestjs/common';
import type {MongodbOptions} from './mongodb.types';
import {MongodbCoreModule} from './mongodb-core.module';

@Module({})
export class MongodbModule{

    /**
     * @param {MongodbOptions} options
     * @return {DynamicModule}
     */
    public static forRoot(options: MongodbOptions): DynamicModule{
        return {
            module: MongodbModule,
            imports: [
                MongodbCoreModule.forRoot(options)
            ]
        };
    }

}
