import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Translation } from './entities/translation.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
  ) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { translations, sku, price, updatedBy } = createProductDto;

      const existingProduct = await this.productRepository.findOne({ where: { sku } });
      
      if (existingProduct) {
        throw new BadRequestException('SKU already exists.');
      }
      
      if (!translations || translations.length === 0) {
        throw new BadRequestException('Translations are required. Please provide at least one translation.');
      }
      const newProduct  = this.productRepository.create({ sku, price, updatedBy });
      await this.productRepository.save(newProduct );
  
      const productTranslations = translations.map(translation => {
        return this.translationRepository.create({
          ...translation,
          productId: newProduct .id,
        });
      });
  
      await this.translationRepository.save(productTranslations);
  
      return newProduct;
    } catch (error) {
      throw error
    }
   
  }

  async searchByName(name: string): Promise<Product[]> {
    try {
      if (!name) {
        throw new NotFoundException('Product not found.');
      }

      const result = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.translations', 'translation')
      .where('translation.name LIKE :name', { name: `%${name}%` })
      .select(['product', 'translation.name', 'translation.description'])
      .getMany();

      if (!result) {
        throw new NotFoundException('Product not found.')
      }
      
      return result
    } catch (error) {
      throw error
    }
  }
}
