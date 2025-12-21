import type { Request, Response,NextFunction } from "express";
import { BaseService } from "../services/base.service.js";
import { ApiError } from "../middlewares/ApiError.js";

export class BaseController<T extends {id:string}>{
    protected service: BaseService<T>;

    constructor(service:BaseService<T>){
        this.service=service
    }

    async findAll(req:Request,res:Response,next:NextFunction){
        try{
            const data=await this.service.findAll()

            return res.status(200).json({
                success:true,
                message:"Data retrieved successfully",
                data
            })
        }catch(err){
            next(err)
        }
    }

    async findOne(req:Request,res:Response,next:NextFunction){
        try{
            const {id}=req.params
            const data=await this.service.findOne(id as string)
            return res.status(200).json({
                success:true,
                message:"Data retrieved successfully",
                data
            })
        }catch(err){
            next(err)
        }
    }


    async delete(req:Request,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            await this.service.delete(id as string)

            return res.status(200).json({
                success:true,
                message:"Data deleted successfully",
                data:null
            })
        } catch (err) { 
            next(err)
        }
    }
}

