import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'driver' })
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 50 })
  driverLicense: string;

  @Column({ type: 'varchar', length: 2 })
  isoCountry: string;
}
