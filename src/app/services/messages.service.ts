import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: string[] = [];

  constructor() {}

  addMessage(message: string): void {
    this.messages.push(message);
  }

  clearMessages(): void {
    this.messages = [];
  }

  getMessages(): string[] {
    return this.messages;
  }
}
