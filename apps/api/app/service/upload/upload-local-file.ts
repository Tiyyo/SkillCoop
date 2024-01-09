import fs from 'fs';
import path from 'path';
import url from 'url';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export async function uploadLocalFile(fileName: string) {
  const filePath = path.join(dirname);
  console.log(filePath);
  // const image = fs.readFileSync('');
}
