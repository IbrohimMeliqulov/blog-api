Project name blog-api with  a REST API with Express, PostgreSQL, TypeOrm, and TypeScript
-------------------------------------------------------------------------------------------
Dependancies that must be installed in order to run the project:
```bash
npm install express typeorm pg bcrypt
npm install -D typescript nodemon
```
This is TypeScript settings:
```bash
"dev": "tsc -w & nodemon dist/server.js"
```
tsconfig.json configuration:
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
