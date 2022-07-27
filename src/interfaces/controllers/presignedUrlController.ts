import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { s3Client } from "@/infrastructure/aws/s3-client";

const bucket = process.env.AWS_S3_BUCKET;

export const createPresignedUrlController = () => {
  return {
    createPresignedUrl: async (_: Request, res: Response) => {
      const key = `image-${uuid()}`;
      // Create a command to put the object in the S3 bucket.
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      // Create the presigned URL.
      const signedUrl = await getSignedUrl(s3Client, command, {
        // NOTE: production에서는 1분, 개발 환경에선 10분 뒤에 expire 되는 url 발급
        expiresIn: process.env.NODE_ENV === "production" ? 60 : 10 * 60,
      });

      res.json({ signedUrl });
    },
  };
};
