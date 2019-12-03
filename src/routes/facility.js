import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const facilities = await req.context.models.Facility.find(  );
  return res.send(facilities);
});

export default router;
