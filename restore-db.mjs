import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

// Function to convert 24 hex character strings back to ObjectIds
function restoreObjectIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(restoreObjectIds);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      // Convert _id, or fields ending in "Id" that are 24 hex characters
      if ((key === '_id' || key.endsWith('Id')) && typeof val === 'string' && /^[0-9a-fA-F]{24}$/.test(val)) {
        newObj[key] = new ObjectId(val);
      } else {
        newObj[key] = restoreObjectIds(val);
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
    console.log('Connected to NEW MongoDB successfully.');
    
    const db = client.db(); 

    const backupDir = path.join(process.cwd(), 'database_backup');
    if (!fs.existsSync(backupDir)) {
      console.error('Backup directory not found:', backupDir);
      process.exit(1);
    }

    const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} collections to restore. Starting restore...`);

    for (const file of files) {
      const collectionName = file.replace('.json', '');
      console.log(`\nRestoring collection: ${collectionName}...`);
      
      const filePath = path.join(backupDir, file);
      let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      if (!Array.isArray(data) || data.length === 0) {
        console.log(`  -> Skipping ${collectionName}, no data to insert.`);
        continue;
      }

      // Convert string IDs back to MongoDB ObjectIds
      data = restoreObjectIds(data);
      
      const collection = db.collection(collectionName);
      
      try {
        // ordered: false allows continuing insertion even if some documents throw duplicate key errors
        const result = await collection.insertMany(data, { ordered: false });
        console.log(`  -> Successfully inserted ${result.insertedCount} documents.`);
      } catch (error) {
        if (error.code === 11000) { // Duplicate key error
          console.log(`  -> Inserted ${error.result?.nInserted || 0} new documents. Skipped duplicates (they already exist).`);
        } else {
          console.error(`  -> Error inserting into ${collectionName}:`, error.message);
        }
      }
    }

    console.log('\n✅ Restore completed successfully.');

  } catch (error) {
    console.error('Error during restore:', error);
  } finally {
    await client.close();
  }
}

restore();
