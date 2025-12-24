Project name blog-api with  a REST API with Express, PostgreSQL, TypeOrm, and TypeScript
-------------------------------------------------------------------------------------------
#Install dependencies:
```bash
npm install express typeorm pg bcrypt
npm install -D typescript nodemon
```
#This is TypeScript settings:
```bash
"dev": "tsc -w & nodemon dist/server.js"
```
#tsconfig.json configuration:
```bash
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```
#In order to run the project:
```bash
npm run dev
```
##Used Tech Stack:
-Nodejs
-Express
-TypeScript
-PostgreSQL
-TypeORM
-Zod(validation)
-bcrypt(password hashing)
-Luxon(date/time)
