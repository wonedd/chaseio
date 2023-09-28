import { Router } from 'express';
import { SearchController } from '../controllers/SearchController.js'
import { AuthController } from '../controllers/security/AuthController.js';
import { AuthToken } from '../middlewares/security/AuthToken.js';
import { ChaseioRepository } from '../database/ChaseioRepository.js';
import { AuthService } from '../services/security/AuthService.js';
import { SearchService } from '../services/SearchService.js';
import { BotService } from '../services/security/BotService.js';
import { BotController } from '../controllers/security/BotController.js';

const router = Router();

const SECRET_KEY = process.env.SECRET_KEY

const chaseioRepository = new ChaseioRepository();

const searchService = new SearchService(chaseioRepository);
const authService = new AuthService(SECRET_KEY, chaseioRepository);
const botService = new BotService(chaseioRepository)

const searchController = new SearchController(searchService);
const authController = new AuthController(authService);
const botController = new BotController(botService);
const authToken = new AuthToken();


router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.post('/bot', (req, res) => {
  botController.sendWpp(req, res);
})

router.use('/search', authToken.authenticateToken);

router.post('/search', (req, res) => {
  searchController.fetchData(req, res);
});

router.get('/', (req, res) => {
  searchController.fetchAll(req, res);
});

export function initRoutes(app) {
  app.use('/', router);
}
