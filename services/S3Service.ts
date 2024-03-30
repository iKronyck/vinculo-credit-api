import { GetObjectCommand, PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } from '../utils/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
    });
  }

  public async uploadFile(filename: string, body: Buffer): Promise<PutObjectCommandOutput> {
    const putObjectCommand = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
      Body: body,
    });
    try {
      return await this.s3Client.send(putObjectCommand);
    } catch (error) {
      console.error('Error al subir archivo a S3:', error);
      throw error;
    }
  }

  public async getFileURL(filename: string) {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
