import type { IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";
import app from "../src/app.js";
import config from "../src/app/config/index.js";
import seedAdmin from "../src/app/DB/index.js";

type Handler = (req: IncomingMessage, res: ServerResponse) => void;

const globalCache = globalThis as typeof globalThis & {
  mongooseConn?: typeof mongoose | null;
  mongoosePromise?: Promise<typeof mongoose> | null;
  adminSeeded?: boolean;
};

async function connectDB() {
  if (globalCache.mongooseConn) {
    return globalCache.mongooseConn;
  }
  if (!globalCache.mongoosePromise) {
    globalCache.mongoosePromise = mongoose
      .connect(config.database_url as string)
      .then((conn) => conn);
  }
  globalCache.mongooseConn = await globalCache.mongoosePromise;
  if (!globalCache.adminSeeded) {
    await seedAdmin();
    globalCache.adminSeeded = true;
  }
  return globalCache.mongooseConn;
}

const handler: Handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

export default handler;
