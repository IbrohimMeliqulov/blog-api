import {DataSource} from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user";
dotenv.config()


const host=process.env.DB_HOST
const port=process.env.DB_PORT ? Number(process.env.DB_PORT):5432
const username=process.env.DB_USERNAME
const password=process.env.DB_PASSWORD
const database=process.env.DB_DATABASE

if(!host || !port || !password ||! username|| !database){
    throw new Error("One or more database environment variables are missing")
}

const AppDataSource=new DataSource({
    type:"postgres",
    host,
    port,
    username,
    password,
    database,
    entities:[User],
    synchronize:false,
    logging:true
})

export default AppDataSource


AppDataSource.initialize()
.then(()=>{
    console.log("You are connected to Database successfully")
})
.catch((err:any)=>{
    console.log("Error occured",err)
    console.error(err)
})