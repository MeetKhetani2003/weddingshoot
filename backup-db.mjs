import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function backup() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found in environment variables.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB successfully.');
    
    // Connect to the default db from URI
    const db = client.db(); 

    const collections = await db.listCollections().toArray();
    
    const backupDir = path.join(process.cwd(), 'database_backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log(`Found ${collections.length} collections. Starting backup to ${backupDir}...`);

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`Backing up collection: ${collectionName}...`);
      
      const collection = db.collection(collectionName);
      const docs = await collection.find({}).toArray();
      
      const filePath = path.join(backupDir, `${collectionName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(docs, null, 2), 'utf-8');
      
      console.log(`  -> Saved ${docs.length} documents to ${collectionName}.json`);
    }

    console.log('\n✅ Backup completed successfully.');

  } catch (error) {
    console.error('Error during backup:', error);
  } finally {
    await client.close();
  }
}

backup();
