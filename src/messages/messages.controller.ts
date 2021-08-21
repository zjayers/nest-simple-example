import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { DefaultMessagesService } from './default.messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: DefaultMessagesService) {}

  @Get()
  public getAllMessages() {
    return this.messagesService.findAllMessages();
  }

  @Get(':id')
  public async getOneMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOneMessage(id);

    if (!message) {
      throw new NotFoundException(`Message was not found for id: ${id}`);
    }

    return message;
  }

  @Post()
  public createOneMessage(@Body() { content }: CreateMessageDto) {
    return this.messagesService.addOneMessage(content);
  }
}
