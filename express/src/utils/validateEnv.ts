import 'dotenv/config';
import { cleanEnv, port, str, num } from 'envalid';

const validateEnv = () => {
    return cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        LOGS_PATH: str(),
        DATABASE_URL: str(),
        SECRET: str(),
        BCRYPT_ROUNDS: num({ default: 10 })
    });
};
export default validateEnv;
