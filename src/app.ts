import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import globalErrorHandeler from './app/middleware/globalErrorHandeler.js';
import notFound from './app/middleware/notFound.js';
import router from './app/routes/index.js';
import cookieParser from 'cookie-parser';
import config from './app/config/index.js';
const app: Application = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://quick-hire-job-web.vercel.app',
  ...(config.client_url ? [config.client_url] : []),
  ...(config.cors_origins
    ? config.cors_origins.split(',').map((origin) => origin.trim())
    : []),
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options('/{*splat}', cors(corsOptions));

//application routes


//moved application routes in router folder to organize
app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  res.send('Server is Running ....');
};

app.get('/', getAController);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);
//global error handeler

app.use(globalErrorHandeler);

//not Found

app.use(notFound);

export default app;
