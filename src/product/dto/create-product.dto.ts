import { IsString, IsNumber, IsArray } from 'class-validator';
import { CreateTranslationDto } from './create-translation.dto';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsString()
  updatedBy: string;

  @IsArray()
  translations: CreateTranslationDto[];
}
