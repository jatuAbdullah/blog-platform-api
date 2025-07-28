import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // You can load custom .env files if needed:
      // envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('TypeORM');
        logger.log(`✅ DB_HOST: ${config.get('DB_HOST')}`);
        logger.log(`✅ DB_PORT: ${config.get('DB_PORT')}`);
        logger.log(`✅ DB_USERNAME: ${config.get('DB_USERNAME')}`);
        logger.log(`✅ DB_DATABASE: ${config.get('DB_DATABASE')}`);
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true, // 🚫 CAREFUL: true only for dev!
        };
      },
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CommentModule,
    LikeModule,
  ],
})
export class AppModule {
  constructor(configService: ConfigService) {
    const logger = new Logger('AppModule');
    logger.log(`✅ JWT_SECRET at startup: ${configService.get('JWT_SECRET')}`);
  }
}
