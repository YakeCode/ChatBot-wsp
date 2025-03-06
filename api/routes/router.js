//@ts-check

import express from 'express';
import webhookRouter from './webhookRoutes.js';
import calendarRouter from './calendarRoutes.js';

const routerApi = (app) => {
  /*Versionar rutas */
  const routerMaster = express.Router();
  app.use('/'/*'/api/v1'*/, routerMaster);
  routerMaster.use('/', webhookRouter);
  routerMaster.use('/calendar', calendarRouter);
};

export { routerApi };
