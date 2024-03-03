/*eslint-disable */
const fs = require('fs');
const path = require('path');

function readTypeFile() {
  const filePath = path.resolve(
    __dirname,
    '../infrastructure/kysely/database.type.ts',
  );
  const file = fs.readFileSync(filePath, 'utf-8');
  const lines = file.split('\n');
  const generatedTypeLines = lines.map((line) => {
    if (!line.includes('export type') && line.includes('Generated')) {
      const insideChevrons = line.match(/<(.*)>/)[1];
      const key = line.split(' Generated')[0];
      const newLine = `${key} ${insideChevrons};`;
      return newLine;
    }
    return line;
  });
  const newFiles = generatedTypeLines.join('\n');
  fs.writeFileSync(filePath, newFiles);
}
readTypeFile();
