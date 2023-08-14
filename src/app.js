import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';

import { fileURLToPath } from 'url';
import { SearchService } from './services/SearchService';
import { SearchController } from './controllers/SearchController';
import { ChaseioRepository } from './database/ChaseioRepository';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/styles', express.static(join(__dirname, 'styles')));
app.use('/scripts', express.static(join(__dirname, 'scripts')));
app.use('./', express.static(join(__dirname, 'scripts')));

app.set('views', join(__dirname, 'views'));

const chaseioRepository = new ChaseioRepository();
const searchService = new SearchService(chaseioRepository);
const searchController = new SearchController(searchService);

app.post('/search', searchController.fetchData);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
