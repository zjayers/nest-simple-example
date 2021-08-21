import { Injectable } from '@nestjs/common';
import { DefaultMessagesRepository } from './default.messages.repository';

export interface MessagesService {
  readonly messagesRepository: DefaultMessagesRepository;

  findAllMessages(): any;

  findOneMessage(id: string): any;

  addOneMessage(message: string): any;
}

@Injectable()
export class DefaultMessagesService implements MessagesService {
  constructor(readonly messagesRepository: DefaultMessagesRepository) {}

  public findAllMessages() {
    return this.messagesRepository.getAllMessages();
  }

  public findOneMessage(id: string) {
    return this.messagesRepository.getById(id);
  }

  public addOneMessage(message: string) {
    return this.messagesRepository.addMessageToStorage(message);
  }
}
