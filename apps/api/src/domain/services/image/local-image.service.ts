export class LocalImage {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }
  private async getLocalImage(): Promise<{
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }> {
    // const minmeType = this.filename.split('.').pop();
    return { buffer: Buffer.from('s'), originalname: 's', mimetype: 's' };
    // const filePath = path.join(dirname, pathToPublicFolder + this.filename);
    // try {
    //   const bufferImage = await fs.promises.readFile(filePath);
    //   return {
    //     buffer: bufferImage,
    //     originalname: this.filename,
    //     mimetype: `image/${minmeType}`,
    //   };
    // } catch (error) {
    //   throw new DomainException(
    //     `File could not be found localy, check that filename and its extension are correct` +
    //     dirname,
    //     'LocalImage',
    //   );
    // }
  }
  get image() {
    return this.getLocalImage();
  }
}
