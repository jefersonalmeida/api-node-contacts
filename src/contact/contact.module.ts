import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRepository } from '../person/person.repository';
import { ContactController } from './contact.controller';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonRepository, ContactRepository]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {
}
