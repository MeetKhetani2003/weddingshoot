import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null, bucket: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return { conn: cached.conn, bucket: cached.bucket };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      const db = mongoose.connection.db;
      const bucket = new GridFSBucket(db!, {
        bucketName: "photos",
      });
      return { conn: mongoose, bucket };
    });
  }

  try {
    const result = await cached.promise;
    cached.conn = result.conn;
    cached.bucket = result.bucket;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return { conn: cached.conn, bucket: cached.bucket };
}
