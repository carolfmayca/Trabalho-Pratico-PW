import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    return cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        OUTDIR: str(),
        DATABASE_URL: str(),
        SECRET: str()
    });
};
export default validateEnv;
