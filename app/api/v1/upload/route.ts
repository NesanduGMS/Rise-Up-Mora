// app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(req: Request): Promise<NextResponse> {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;
  const fileType = formData.get("fileType") as string;

  if (!file || !userId || !fileType) {
    return NextResponse.json(
      { error: "File, userId or fileType not provided" },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = bufferToStream(buffer);

    const upload = await new Promise<
      UploadApiResponse | UploadApiErrorResponse
    >((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `users/${userId}`, public_id: `${fileType}` },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      stream.pipe(uploadStream);
    });

    if ("secure_url" in upload) {
      return NextResponse.json({ url: upload.secure_url });
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}
