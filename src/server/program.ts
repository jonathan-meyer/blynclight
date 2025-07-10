import express, { Router } from 'express';
import { LoggerFactory } from '../lib/Logger';
import ProgramManager from '../lib/ProgramManager';

const logger = LoggerFactory.getLogger('blynclight:program:router');

export default (programs: ProgramManager): Router =>
  express
    .Router()

    .get('/', (req, res) => {
      res.json(programs);
    })
    .get('/stop', (req, res) => {
      programs.stopAll();
    })

    .get('/:id', (req, res) => {
      const { id } = req.params;
      const program = programs.get(id);
      program ? res.json(program) : res.sendStatus(404);
    })
    .get('/:id/start', (req, res) => {
      const { id } = req.params;
      programs.start(id) ? res.json(programs.get(id)) : res.sendStatus(404);
    })
    .get('/:id/stop', (req, res) => {
      const { id } = req.params;
      programs.stop(id) ? res.json(programs.get(id)) : res.sendStatus(404);
    })

    .post('/:id', (req, res) => {
      const { id } = req.params;
      const options = req.body;

      programs.start(id, options)
        ? res.json(programs.get(id))
        : res.sendStatus(404);
    })

    .get('*', (req, res) => {
      res.sendStatus(404);
    });
