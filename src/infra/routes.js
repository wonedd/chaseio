import { promises as fsPromises } from 'fs';
import path from 'path';
import { URL, fileURLToPath } from 'url';
import { Router } from 'express';
import { SearchController } from '../controllers/SearchController.js'
import { AuthController } from '../controllers/security/AuthController.js';
import { AuthToken } from '../middlewares/security/AuthToken.js';
import { ChaseioRepository } from '../database/ChaseioRepository.js';
import { AuthService } from '../services/security/AuthService.js';
import { SearchService } from '../services/SearchService.js';
import { BotService } from '../services/security/BotService.js';
import { BotController } from '../controllers/security/BotController.js';
import { UserRepository } from '../database/UserRepository.js';
import { MessagesRepository } from '../database/MessageRepository.js';

const { readFile } = fsPromises;

const currentFileURL = new URL(import.meta.url);
const currentDirectory = path.dirname(fileURLToPath(currentFileURL));


const router = Router();

const SECRET_KEY = process.env.SECRET_KEY

const chaseioRepository = new ChaseioRepository();
const userRepository = new UserRepository();
const messageRepository = new MessagesRepository();


const searchService = new SearchService(chaseioRepository);
const authService = new AuthService(SECRET_KEY, userRepository);
const botService = new BotService(messageRepository)

const searchController = new SearchController(searchService);

const authController = new AuthController(authService);
const botController = new BotController(botService);
const auth = new AuthToken();

router.get('/doc', async (req, res) => {
  const publicDir = path.join(currentDirectory, '../views');
  const filePath = path.join(publicDir, 'index.html');
  try {
    const data = await readFile(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao ler o arquivo HTML.');
  }
});

router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.get('/messages', (req, res) => botController.findAllMessages(req, res))

router.get('/logout', (req, res) => authController.logout(req, res));

router.post('/search', (req, res) => {
  searchController.searchBy(req, res);
});
router.get('/', (req, res) => {
  searchController.fetchAll(req, res);
});

router.use('/search/cnae', auth.authenticateToken);
// router.use('/', auth.authenticateToken);
router.use('/bot', auth.authenticateToken);

router.post('/bot', (req, res) => {
  botController.sendWpp(req, res);
})

router.post('/search/cnae', (req, res) => {
  searchController.fetchDataByCnae(req, res);
});





export function initRoutes(app) {
  app.use('/', router);
}
