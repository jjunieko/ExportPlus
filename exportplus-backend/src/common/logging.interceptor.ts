import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { performance } from 'perf_hooks';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const { method, url, body } = req;
      const start = performance.now();
  
      return next.handle().pipe(
        tap((response) => {
          const time = (performance.now() - start).toFixed(1);
           // facilitate debugging by uncommenting the lines below
          console.log(`[${method}] ${url} - ${time}ms`);
          console.log(`Body:`, body);
          console.log(`Response:`, response);
        }),
      );
    }
  }
