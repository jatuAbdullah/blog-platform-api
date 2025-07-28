"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const article_module_1 = require("./article/article.module");
const comment_module_1 = require("./comment/comment.module");
const like_module_1 = require("./like/like.module");
let AppModule = class AppModule {
    constructor(configService) {
        const logger = new common_1.Logger('AppModule');
        logger.log(`✅ JWT_SECRET at startup: ${configService.get('JWT_SECRET')}`);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const logger = new common_1.Logger('TypeORM');
                    logger.log(`✅ DB_HOST: ${config.get('DB_HOST')}`);
                    logger.log(`✅ DB_PORT: ${config.get('DB_PORT')}`);
                    logger.log(`✅ DB_USERNAME: ${config.get('DB_USERNAME')}`);
                    logger.log(`✅ DB_DATABASE: ${config.get('DB_DATABASE')}`);
                    return {
                        type: 'postgres',
                        host: config.get('DB_HOST'),
                        port: config.get('DB_PORT'),
                        username: config.get('DB_USERNAME'),
                        password: config.get('DB_PASSWORD'),
                        database: config.get('DB_DATABASE'),
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                },
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            article_module_1.ArticleModule,
            comment_module_1.CommentModule,
            like_module_1.LikeModule,
        ],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map