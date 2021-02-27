import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeletedDto } from '../common/dto/deleted.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonDto } from './dto/person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@ApiTags('persons')
@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  async index(): Promise<PersonDto[]> {
    return await this.personService.index();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PersonDto> {
    return await this.personService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePersonDto): Promise<PersonDto> {
    return await this.personService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePersonDto): Promise<PersonDto> {
    return await this.personService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeletedDto> {
    return await this.personService.delete(id);
  }
}
