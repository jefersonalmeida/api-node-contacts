import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeletedDto } from '../common/dto/deleted.dto';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('contacts')
@Controller('persons/:personId/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {
  }

  @Get()
  index(@Param('personId', ParseUUIDPipe) personId: string): Promise<ContactDto[]> {
    return this.contactService.index(personId);
  }

  @Get(':id')
  findOne(@Param('personId', ParseUUIDPipe) personId: string,
          @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ContactDto> {
    return this.contactService.findOne(personId, id);
  }

  @Post()
  create(@Param('personId', ParseUUIDPipe) personId: string,
         @Body() dto: CreateContactDto,
  ): Promise<ContactDto> {
    return this.contactService.create(personId, dto);
  }

  @Put(':id')
  update(@Param('personId', ParseUUIDPipe) personId: string,
         @Param('id') id: string,
         @Body() dto: UpdateContactDto,
  ): Promise<ContactDto> {
    return this.contactService.update(personId, id, dto);
  }

  @Delete(':id')
  delete(@Param('personId', ParseUUIDPipe) personId: string,
         @Param('id') id: string,
  ): Promise<DeletedDto> {
    return this.contactService.delete(personId, id);
  }
}
