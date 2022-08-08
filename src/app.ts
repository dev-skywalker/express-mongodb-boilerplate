import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import createServer from "./utils/server";
import swaggerDocs from "./utils/swagger";


const port = config.get<number>('port');

console.log(config.get('accessTokenPrivateKey'));
console.log("ggg");

const app = createServer();

app.listen(port, async()=>{
    logger.info(`App is running at http://localhost:${port}`);
    await connect();
    swaggerDocs(app, port);
});
