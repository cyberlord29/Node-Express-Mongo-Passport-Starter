import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.post('/authenticate', async (req, res) => {
  const user = await req.context.models.User.authenticate({
    username:req.body.username ,password:req.body.password
  });
  if(user)
  return res.status(200).send(user);
  else
  return res.status(401).send({error:"wrong password or username"});
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

export default router;
