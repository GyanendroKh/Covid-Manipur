import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
  Column
} from 'typeorm';

@Entity()
@Unique('unique', ['date', 'district'])
class Case extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  district: number;

  @Column()
  date: string;

  @Column()
  confirmed: number;

  @Column()
  death: number;

  @Column()
  recovered: number;
}

export default Case;
