import express from 'express';
import session from 'express-session';

export function applyMiddleware(app) {
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        path: '/',
      },
    })
  );

}
