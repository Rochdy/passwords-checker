import * as express from 'express';
import {checkPassword} from '../services/security';

const router = express.Router();

router.post('/password', (request, res) => {
  if (!request.body.password) {
    res.status(400).json({error: 'Password not provided!'});
    return;
  }

  const result = checkPassword(request.body.password);
  if (result.length > 0) {
    res.status(400).json({errors: result});
  } else {
    res.status(204).json({});
  }
});

module.exports = router;
