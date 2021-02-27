import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from '../contact/contact.repository';
import { PersonController } from './person.controller';
import { PersonRepository } from './person.repository';
import { PersonService } from './person.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonRepository, ContactRepository]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {
}
