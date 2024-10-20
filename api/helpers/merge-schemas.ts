import * as fs from 'fs';
import * as path from 'path';

const modelsDir: string = path.join(__dirname, '../prisma/models');
const schemaPath: string = path.join(__dirname, '../prisma/schema.prisma');

const dataSource: string = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

const mergeSchemas = async (): Promise<void> => {
  let models: string = '';

  const files: string[] = fs.readdirSync(modelsDir);

  files.sort((a, b) => {
    const prefixA = parseInt(a.split('_')[0]);
    const prefixB = parseInt(b.split('_')[0]);
    return prefixA - prefixB;
  });

  files.forEach((file: string) => {
    const filePath: string = path.join(modelsDir, file);
    const modelContent: string = fs.readFileSync(filePath, 'utf8');
    models += modelContent + '\n'; 
  });

  const finalSchema: string = `${dataSource}\n${models}`;
  
  fs.writeFileSync(schemaPath, finalSchema);
  
  console.log('✅ Schema merged successfully!');
};

mergeSchemas().catch((error: Error) => {
  console.error('❌ Error merging schemas:', error);
});
