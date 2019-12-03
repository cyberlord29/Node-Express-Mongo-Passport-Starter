import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Test.find();
  return res.send(messages);
});

router.get('/:testId', async (req, res) => {
  const test = await req.context.models.Test.findById(
    req.params.testId,
  );
  return res.send(test);
});

router.post('/', async (req, res) => {
  const test = await req.context.models.Test.create({
    text: req.body.text,
    user: req.context.me.id,
  });

  return res.send(test);
});

router.delete('/:testId', async (req, res) => {
  const test = await req.context.models.Test.findById(
    req.params.testId,
  );

  let result = null;
  if (test) {
    result = await test.remove();
  }

  return res.send(result);
});

export default router;
