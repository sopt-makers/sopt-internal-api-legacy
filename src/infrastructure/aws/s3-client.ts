import { S3Client } from "@aws-sdk/client-s3";

const REGION = process.env.AWS_REGION;

// NOTE: .env의 AWS credentials에 의해 role이 부여됨
const s3Client = new S3Client({ region: REGION });

export { s3Client };
