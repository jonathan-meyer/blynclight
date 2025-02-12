import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import { Blynclight } from '../lib/Blynclight';
import ProgramManager from '../lib/ProgramManager';
import lightRouter from './light';
import programRouter from './program';

export default (light: Blynclight, programs: ProgramManager) => {
  const app = express();

  app.use(morgan('common'));
  app.use(bodyParser.json());
  app.use(errorHandler());

  app.use('/light', lightRouter(light, programs));
  app.use('/program', programRouter(programs));

  app.get('*', (req, res) => {
    res.status(404).json({ routes: ['/light', '/program'] });
  });

  return app;
};
