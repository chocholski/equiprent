import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MessageType, MessageTypes } from '../../tools/message-type';

@Injectable()
export class DialogMessageService {

  constructor(private messageService: MessageService) {
  }

  public addError(summary: string) {
    this.addMessage(MessageTypes.error, summary);
  }

  public addInfo(summary: string) {
    this.addMessage(MessageTypes.info, summary);
  }

  public addSuccess(summary: string) {
    this.addMessage(MessageTypes.success, summary);
  }

  public addWarning(summary: string) {
    this.addMessage(MessageTypes.warning, summary);
  }

  private addMessage(type: MessageType, summary: string) {
    this.messageService.add(<Message>{ severity: type.name, summary: summary, life: type.lifeTime });
  }
}