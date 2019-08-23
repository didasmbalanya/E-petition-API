import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api/v1/', routes);
app.get('*', (req, res) => {
  res.status(404).send({ error: 'route not found' });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));

export default app;
