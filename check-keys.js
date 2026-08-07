const fs = require('fs');
const path = require('path');

const backupDir = path.join(process.cwd(), 'database_backup');
const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.json'));

let allKeys = new Set();
let stringKeys = new Set();

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(backupDir, file), 'utf8'));
  
  function scan(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(scan);
    } else if (obj !== null && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        allKeys.add(k);
        if (typeof v === 'string') {
          stringKeys.add(k);
        }
        scan(v);
      }
    }
  }
  
  scan(data);
}

console.log('Keys with strings:', Array.from(stringKeys));
