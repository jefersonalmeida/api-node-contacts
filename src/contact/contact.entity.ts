import { Exclude } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../person/person.entity';
import { ContactTypeEnum } from './contact-type.enum';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  type: ContactTypeEnum;

  @Column({ type: 'varchar', length: 100 })
  value: string;

  @Exclude({ toClassOnly: true })
  @ManyToOne(() => Person, person => person.contacts)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}
