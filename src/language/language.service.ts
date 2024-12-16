import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity'
import { CreateLanguageDto } from './dto/create-language.dto';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    try {
      const { languageCode, languageName } = createLanguageDto

      const existingLanguageCode = await this.languageRepository.findOne({
        where: { languageCode }
      });
  
      if (existingLanguageCode) {
        throw new BadRequestException(`Language code "${languageCode}" already exists.`);
      }
  
      const existingLanguageName = await this.languageRepository.findOne({
        where: { languageName }
      });
  
      if (existingLanguageName) {
        throw new BadRequestException(`Language name "${languageName}" already exists.`);
      }

      const language = this.languageRepository.create({ languageCode, languageName });
      const result = await this.languageRepository.save(language);
      return result
    } catch (error) {
      throw(error)
    }
  }

  async findAll(): Promise<Language[]> {
    try {
      const result = await this.languageRepository.find()
      
      return result || []
    } catch (error) {
      throw(error)
    }    
  }
}
