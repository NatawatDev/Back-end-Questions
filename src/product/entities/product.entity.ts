import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Translation } from './translation.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  sku: string;

  @Column({ default: 0 })
  price: number;

  @OneToMany(() => Translation, translation => translation.productId)
  translations: Translation[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null })
  updatedAt: Date;

  @Column({ default: 'admin' })
  updatedBy: string;
}
