import express from 'express';

export function applyMiddleware(app) {
  app.use(express.json());
}
