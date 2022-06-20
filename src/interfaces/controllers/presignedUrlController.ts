import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { s3Client } from "@/infrastructure/aws/s3-client";

// TODO: edit bucket based on environment
const bucket = "sopt-core-assets-local";

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
        // NOTE: 1 시간 뒤에 expire 되는 url 발급
        expiresIn: 3600,
      });

      res.json({ signedUrl });
    },
  };
};
