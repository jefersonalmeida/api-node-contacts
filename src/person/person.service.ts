import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeletedDto } from '../common/dto/deleted.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(@InjectRepository(PersonRepository) private readonly personRepository: PersonRepository) {
  }

  async index(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findOne(id: string): Promise<Person> {
    const coffee = await this.personRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new NotFoundException(`Pessoa #${id} não encontrada`);
    }
    return coffee;
  }

  async create({ name }: CreatePersonDto): Promise<Person> {
    const obj = this.personRepository.create({
      name,
    });
    return this.personRepository.save(obj);
  }

  async update(id: string, dto: UpdatePersonDto): Promise<Person> {
    const obj = await this.personRepository.preload({
      id,
      ...dto,
    });
    if (!obj) {
      throw new NotFoundException(`Pessoa #${id} não encontrada`);
    }
    await this.personRepository.save(obj);
    return this.findOne(id);
  }

  async delete(id: string): Promise<DeletedDto> {
    const deleted = await this.personRepository.delete({ id });
    return new DeletedDto(deleted.affected);
  }
}
