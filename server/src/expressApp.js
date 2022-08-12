import { renderFile } from 'ejs';
import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import expressStaticGzip from 'express-static-gzip';
import routes from '../routes';

dotEnv.config();

export default (expressApp) => {
  expressApp.use(logger('dev'));
  expressApp.use(bodyParser.json());
  expressApp.use(cors({origin: '*'}));
  expressApp.use(bodyParser.urlencoded({
    extended: false
  }));

  expressApp
    .get(
      '/api/',
      (req, res) => res.status(200).send({
        message: 'Welcome to WAW-Recipe'
      })
    );

  expressApp.use(expressStaticGzip(path.join(__dirname, '../client/build')));
  expressApp.use('/docs/v1', express.static(path.join(__dirname, '../docs/v1')));
  expressApp.engine('.html', renderFile);

  expressApp.use('/api/v1', routes);
  return expressApp;
};