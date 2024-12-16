import { IsString, IsUUID } from 'class-validator';

export class CreateTranslationDto {
  @IsUUID()
  languageId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}