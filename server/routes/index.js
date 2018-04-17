import express from 'express';
import { user } from '../helpers/dummyData';

const router = express.Router();

router.get('/sample', (req, res) => {
  res.status(200).send({
    user,
    message: `Hey buddy ${user.username}`
  });
});

export default router;