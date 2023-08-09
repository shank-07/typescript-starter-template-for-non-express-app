import { cleanEnv, port, str, num } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        RATE_LIMITING_MS: num(),
        RATE_LIMITING_REQUEST_PER_MS: num(),
        MONGO_URI: str(),

        RABBIT_MQ_CONNECTION_STRING: str(),
        RABBIT_MQ_TOPIC_NAME: str(),

        // CHANNEL_LEVEL_RATE_LIMIT
        SMS_CHANNEL_LEVEL_RATE_LIMIT: num(),
        EMAIL_CHANNEL_LEVEL_RATE_LIMIT: num(),
        WHATSAPP_CHANNEL_LEVEL_RATE_LIMIT: num(),
    });
};

export default validateEnv;
