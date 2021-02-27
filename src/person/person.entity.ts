import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from '../contact/contact.entity';

@Entity({ name: 'persons' })
export class Person {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Exclude({ toClassOnly: true })
  @OneToMany(() => Contact, (contact) => contact.person, {
    cascade: true,
  })
  contacts: Contact[];
}
