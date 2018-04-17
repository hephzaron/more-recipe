import express from 'express';
import { user } from '../helpers/dummyData';

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).send({
    user,
    message: `Welcome buddy ${user.username}`
  });
});

export default router;