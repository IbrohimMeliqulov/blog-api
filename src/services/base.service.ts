import type { Repository,FindOptionsWhere, FindManyOptions } from "typeorm";
import { ApiError } from "../middlewares/ApiError.js";

export class BaseService<T extends {id:string}>{
    protected repository:Repository<T>

    constructor(repository:Repository<T>){
        this.repository=repository
    }


    async findAll(options?:FindManyOptions<T>):Promise<T[]>{
        return await this.repository.find(options)
    }

    async findOne(id:string): Promise<T> {
        const entity=await this.repository.findOne({
            where:{id} as FindOptionsWhere<T>
        })


        if(!entity){
            throw ApiError.notFound(`Resource with ID ${id} not found`)
        }

        return entity
    }

    async delete(id:string):Promise<void>{
        
        const entity=await this.repository.findOne({
            where:{id} as FindOptionsWhere<T>
        })

        if(!entity){
            throw ApiError.notFound(`Resource with ID ${id} not found`)
        }
        await this.repository.remove(entity)
    }
}