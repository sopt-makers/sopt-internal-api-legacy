import { createPresignedPost, PresignedPostOptions } from "@aws-sdk/s3-presigned-post";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { s3Client } from "@/infrastructure/aws/s3-client";

const bucket = process.env.AWS_S3_BUCKET as string;

export const createPresignedUrlController = () => {
  return {
    createPresignedUrl: async (_: Request, res: Response) => {
      const key = `image-${uuid()}`;

      const params: PresignedPostOptions = {
        Bucket: bucket,
        Key: key,
        Fields: {
          acl: "public-read",
        },
        // NOTE: production에서는 1분, 개발 환경에선 10분 뒤에 expire 되는 url 발급
        Expires: process.env.NODE_ENV === "production" ? 60 : 10 * 60,
      };
      // Create the presigned URL.
      const signedUrl = await createPresignedPost(s3Client, params);

      res.json({ signedUrl });
    },
  };
};
