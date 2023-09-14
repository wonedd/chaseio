import express from 'express';
import { initApp } from './init.js';

const app = express();
const PORT = process.env.PORT || 3000;

initApp(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
