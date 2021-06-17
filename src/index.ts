import * as dotenv from "dotenv";

dotenv.config();
export const config = {
  awsKey: process.env.AWS_LOG_KEY || "",
  awsRegion: process.env.AWS_LOG_REGION || "",
  awsSecret: process.env.AWS_LOG_SECRET || "",
  groupName: process.env.LOG_GROUP_NAME || "",
  showLog: !!process.env.SHOW_LOG || true,
  streamName: process.env.LOG_STREAM_NAME || "",
  useAws: !!process.env.CLOUD_WATCH || false,
  logRequestTagging: !!process.env.REQUEST_TAGGINGCONSOLE_DEBUG || false,
};
