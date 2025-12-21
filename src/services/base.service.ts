import type { Repository, FindOptionsWhere, FindManyOptions } from "typeorm";
import { Like, ILike } from "typeorm";
import { ApiError } from "../middlewares/ApiError.js";

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class BaseService<T extends { id: string }> {
  protected repository: Repository<T>;

  protected searchableFields: (keyof T)[] = [];

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findAllPaginated(
    page: number = 1,
    limit: number = 10,
    options?: FindManyOptions<T>,
  ): Promise<PaginationResult<T>> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async searchPaginated(
    keyword: string,
    page: number = 1,
    limit: number = 10,
    options?: FindManyOptions<T>,
  ): Promise<PaginationResult<T>> {
    if (!keyword || this.searchableFields.length === 0) {
      return this.findAllPaginated(page, limit, options);
    }

    const skip = (page - 1) * limit;
    const whereConditions = this.searchableFields.map((field) => ({
      [field]: ILike(`%${keyword}%`),
    }));

    const [data, total] = await this.repository.findAndCount({
      ...options,
      where: whereConditions as any,
      skip,
      take: limit,
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async search(keyword: string, options?: FindManyOptions<T>): Promise<T[]> {
    if (!keyword || this.searchableFields.length === 0) {
      return this.findAll(options);
    }

    const whereConditions = this.searchableFields.map((field) => ({
      [field]: ILike(`%${keyword}%`),
    }));

    return await this.repository.find({
      ...options,
      where: whereConditions as any,
    });
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw ApiError.notFound(`Resource with ID ${id} not found`);
    }

    return entity;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw ApiError.notFound(`Resource with ID ${id} not found`);
    }
  }
}
