import express, {Request, Response, ErrorRequestHandler} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import categoryRoutes from './routes/categoryRoutes';

export const app: express.Application = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

userRoutes(app);
productRoutes(app);
orderRoutes(app);
categoryRoutes(app);

//catch all errors
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).send({ message: 'err: ' + err.message });
  };
  app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
})