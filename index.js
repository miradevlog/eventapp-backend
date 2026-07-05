import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db.js';

import router from './routes/index.js';
import { setupSwagger } from './swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

if (!isProduction) {
  app.use(morgan('dev'));
  setupSwagger(app);
}

app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);

  if (!isProduction) {
    console.log(`Swagger API docs available at /api-docs`);
  }
});