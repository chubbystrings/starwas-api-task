import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import pool from './database/dbConnect';
import routes from './routes/routes';
import swaggerDocs from '../swaggerDocs';

const app = express();

// connect to database
pool.query('SELECT NOW()', (err) => {
  if (err) {
    throw Error('could not connect');
  }
  // eslint-disable-next-line no-console
  console.log('database connected successfully');
});

// to resolve cross origin resource shearing (CORS) error add following to te response header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

// Parse incoming requests data
app.use(express.json());

// setup the logger
app.use(morgan('dev'));

// configure swagger ui
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options, { explorer: true }));

// use routes
app.use('/api/v1/starwars', routes);
app.get('*', (req, res) => res.end('starwars api backend!!!'));

export default app;
