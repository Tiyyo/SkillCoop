/*eslint-disable */
import fs from 'fs';
import csv from 'csv-parser';

export const convertCsvToJson = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    /*eslint-disable-next-line */
    const results: Array<any> = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const json = JSON.stringify(results, null, 2);
        resolve(json);
      })
      .on('error', (err) => reject(err));
    return results;
  });
};
