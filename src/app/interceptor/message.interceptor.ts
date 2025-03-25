import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from '../services/messages.service';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {

  constructor(private messageService: MessagesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const messages = event.body?.message;
          if (Array.isArray(messages)) {
            messages.forEach((message: string) => {
              this.messageService.addMessage(message);
              console.log(message)
            });
          }
        }
      })
    );
  }
}
