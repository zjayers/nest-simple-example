import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

export interface MessagesRepository {
  getById(id: string): Promise<any>;

  getAllMessages(): Promise<any>;

  addMessageToStorage(message: string): Promise<void>;
}

@Injectable()
export class DefaultMessagesRepository implements MessagesRepository {
  private readonly FILE_NAME = 'messages.json';
  private readonly FILE_ENCODING = 'utf8';

  public async getById(id: string): Promise<any> {
    return JSON.parse(await this.#getMessages())[id];
  }

  public async getAllMessages(): Promise<any> {
    return JSON.parse(await this.#getMessages());
  }

  public async addMessageToStorage(message: string): Promise<void> {
    const messages = JSON.parse(await this.#getMessages());
    const id = this.#getRandomId();

    messages[id] = { id, content: message };

    await this.#updateMessagesFile(messages);
  }

  #getRandomId(): number {
    return Math.floor(Math.random() * 999);
  }

  #getMessages() {
    return readFile(this.FILE_NAME, this.FILE_ENCODING);
  }

  #updateMessagesFile(messages: string[]) {
    return writeFile(this.FILE_NAME, JSON.stringify(messages));
  }
}
