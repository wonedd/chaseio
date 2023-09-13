import express from 'express';
import { SearchService } from './services/SearchService.js';
import { SearchController } from './controllers/SearchController.js';
import { ChaseioRepository } from './database/ChaseioRepository.js';
import { AuthService } from './services/security/AuthService.js';
import { AuthController } from './controllers/security/AuthController.js';
import { AuthToken } from './security/middlewares/AuthToken.js';

const app = express();


const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const chaseioRepository = new ChaseioRepository();
const searchService = new SearchService(chaseioRepository);
const searchController = new SearchController(searchService);

const authService = new AuthService(SECRET_KEY, chaseioRepository);

const authController = new AuthController(authService)

app.use(express.json());

app.post('/login', authController.login)
const authToken = new AuthToken(SECRET_KEY);

app.use('/search', authToken.authenticateToken);

app.post('/search', searchController.fetchData);
app.get('/', searchController.fetchAll);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
