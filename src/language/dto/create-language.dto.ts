import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  languageCode: string;

  @IsString()
  languageName: string;
}