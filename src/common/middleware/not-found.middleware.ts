import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class NotFoundMiddleware implements NestMiddleware {
  use(req, res, next) {
  if (res.headersSent) {
    return next();
  }
  res.status(404).json({
    statusCode: 404,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    message: 'Route not found',
  });
}

}
