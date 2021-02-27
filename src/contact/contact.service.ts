import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeletedDto } from '../common/dto/deleted.dto';
import { Contact } from './contact.entity';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(ContactRepository) private readonly contactRepository: ContactRepository) {
  }

  async index(personId: string): Promise<Contact[]> {
    return await this.contactRepository.find({
      where: { person: { id: personId } },
    });
  }

  async findOne(personId: string, id: string) {
    const coffee = await this.contactRepository.findOne({
      where: { id, person: { id: personId } },
    });
    if (!coffee) {
      throw new NotFoundException(`Contato #${id} não encontrado`);
    }
    return coffee;
  }

  async create(personId: string, dto: CreateContactDto): Promise<Contact> {
    const obj = this.contactRepository.create({
      person: { id: personId },
      ...{
        type: dto.type,
        value: dto.value,
      },
    });
    return this.contactRepository.save(obj);
  }

  async update(personId: string, id: string, dto: UpdateContactDto) {

    const obj = await this.contactRepository.preload({
      id,
      person: { id: personId },
      ...dto,
    });
    if (!obj) {
      throw new NotFoundException(`Contato #${id} não encontrado`);
    }
    await this.contactRepository.save(obj);
    return this.findOne(personId, id);
  }

  async delete(personId: string, id: string): Promise<DeletedDto> {
    const deleted = await this.contactRepository.delete({ id, person: { id: personId } });
    return new DeletedDto(deleted.affected);
  }
}
