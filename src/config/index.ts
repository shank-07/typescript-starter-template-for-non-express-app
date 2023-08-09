import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
    NODE_ENV,
    PORT,
    MONGO_URI,
    SECRET_KEY,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,

    //   RATE LIMITING FLAGS
    RATE_LIMITING_MS,
    RATE_LIMITING_REQUEST_PER_MS,

    //  Rabbit mq connection string
    RABBIT_MQ_CONNECTION_STRING,
    RABBIT_MQ_TOPIC_NAME,

    // CHANNEL_LEVEL_RATE_LIMIT
    SMS_CHANNEL_LEVEL_RATE_LIMIT,
    EMAIL_CHANNEL_LEVEL_RATE_LIMIT,
    WHATSAPP_CHANNEL_LEVEL_RATE_LIMIT,
} = process.env;
