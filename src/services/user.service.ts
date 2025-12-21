import { Repository } from "typeorm";
import { User } from "../entities/user.js";
import { BaseService } from "./base.service.js";
import { ApiError } from "../middlewares/ApiError.js";
import bcrypt from "bcrypt"

export class UserService extends BaseService<User> {
    constructor(userRepository:Repository<User>){
        super(userRepository)
    }


    async createUser(data:Partial<User>):Promise<User>{
        if(data.email){
            const exists=await this.repository.findOne({where:{email:data.email}})

            if(exists){
                throw ApiError.conflict()
            }
        }

        if(!data.email || !data.password){
            throw ApiError.badRequest("Email and password are required")
        }

        if(data.password){
            data.password=await bcrypt.hash(data.password,10)
        }

        const user=this.repository.create(data)
        return await this.repository.save(user)
    }


    async updateUser(id:string,data:Partial<User>):Promise<User>{
        const user=await this.findOne(id)

        if(data.email && data.email !== user.email){
            const emailExists=await this.repository.findOne({
                where:{email:data.email}
            })

            if(emailExists){
                throw ApiError.conflict("Email already in use")
            }
        }


        if(data.password){
            data.password=await bcrypt.hash(data.password,10)
        }

        this.repository.merge(user,data)
        return await this.repository.save(user)
    }


    async findByEmail(email:string):Promise<User>{
        const user= await this.repository.findOne({
            where:{email},
            select:["id","email","password","name"]
        })

        if(!user){
            throw ApiError.notFound("User not found")
        }

        return user
    }
}




