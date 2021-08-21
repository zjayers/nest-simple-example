import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { DefaultMessagesService } from './default.messages.service';
import { DefaultMessagesRepository } from './default.messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [DefaultMessagesService, DefaultMessagesRepository],
})
export class MessagesModule {}
