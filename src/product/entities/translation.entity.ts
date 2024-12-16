import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Language } from '../../language/entities/language.entity';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'productId' })
  productId: string;

  @ManyToOne(() => Language)
  @JoinColumn({ name: 'languageId' })
  languageId: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null })
  updatedAt: Date;

  @Column({ default: 'admin' })
  updatedBy: string;
}
