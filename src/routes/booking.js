import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const bookings = await req.context.models.Booking.find();
  return res.send(bookings);
});

router.post('/', async (req, res) => {


  const bookingInRange = await req.context.models.Booking.aggregate(
    [{
      $match:{
        $and: [
          {facility: req.body.facility},
          {$or: 
            [
              {startTime:{
                $lte:new Date(req.body.endTime),
                $gte:new Date(req.body.startTime)
              }},
              {endTime:{
                $lte:new Date(req.body.endTime),
                $gte:new Date(req.body.startTime)
              }}
            ]
          }
        ]
      },
    },
    {$group:{
        _id:"$facility",
        count: {$sum:1}
      }
    }
  ]
  ).exec()

  if(bookingInRange.length===0){
  const booking = await req.context.models.Booking.create({
    facility: req.body.facility,
    user: req.context.me.id,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  return res.status(200).send(booking);
}

  return res.status(500).send(bookingInRange);
});


export default router;
