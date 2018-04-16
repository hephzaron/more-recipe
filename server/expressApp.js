import { renderFile } from 'ejs';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import expressStaticGzip from 'express-static-gzip';
import routes from './routes';

export default (expressApp) => {
  expressApp.use(logger('dev'));
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({
    extended: false
  }));

  expressApp.use(expressStaticGzip(path.join(__dirname, '../client/build')));
  expressApp.set('views', path.join(__dirname, '../client/build'));
  expressApp.engine('.html', renderFile);

  expressApp.use(routes);
  return expressApp;
};