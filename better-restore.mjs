import { MongoClient, ObjectId, Binary } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

function restoreTypes(obj, collectionName) {
  if (Array.isArray(obj)) {
    return obj.map(item => restoreTypes(item, collectionName));
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      
      // Convert to ObjectId if it's a 24 hex char string and key is an ID
      if (typeof val === 'string' && /^[0-9a-fA-F]{24}$/.test(val) && (key === '_id' || key.toLowerCase().endsWith('id'))) {
        newObj[key] = new ObjectId(val);
      } 
      // Convert data in chunks to Binary
      else if (collectionName.endsWith('.chunks') && key === 'data' && typeof val === 'string') {
        newObj[key] = new Binary(Buffer.from(val, 'base64'));
      }
      // Convert string ISO dates back to Date objects
      else if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(val)) {
        newObj[key] = new Date(val);
      }
      else {
        newObj[key] = restoreTypes(val, collectionName);
      }
    }
    return newObj;
  }
  return obj;
}

async function restore() {
  const uri = process.env.CLIENT_MONGODB_URI;
  if (!uri) {
    console.error('No CLIENT_MONGODB_URI found in environment variables.');
    process.exit(1);
  }

  console.log('Connecting to the NEW client database...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(); 

    const backupDir = path.join(process.cwd(), 'database_backup');
    const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.json'));
    
    console.log(`Found ${files.length} collections to restore. Clearing existing collections first...`);

    // First, clear the database to avoid duplicates and mixed types
    for (const file of files) {
      const collectionName = file.replace('.json', '');
      try {
        await db.collection(collectionName).drop();
        console.log(`  -> Dropped existing collection: ${collectionName}`);
      } catch (e) {
        // ignore if not exists
      }
    }

    console.log(`Starting clean restore...`);

    for (const file of files) {
      const collectionName = file.replace('.json', '');
      console.log(`\nRestoring collection: ${collectionName}...`);
      
      const filePath = path.join(backupDir, file);
      let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      if (!Array.isArray(data) || data.length === 0) {
        console.log(`  -> Skipping ${collectionName}, no data to insert.`);
        continue;
      }

      data = restoreTypes(data, collectionName);
      const collection = db.collection(collectionName);
      
      const result = await collection.insertMany(data);
      console.log(`  -> Successfully inserted ${result.insertedCount} documents.`);
    }

    console.log('\n✅ Restore completed successfully.');

  } catch (error) {
    console.error('Error during restore:', error);
  } finally {
    await client.close();
  }
}

restore();
