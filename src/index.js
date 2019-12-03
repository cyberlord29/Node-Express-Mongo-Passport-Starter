import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import models, { connectDb } from './models';
import routes from './routes';
import jwt from './jwt';  

const app = express();


// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(jwt());

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('maneesh'),
  };
  next();
});

// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/booking', routes.booking);
app.use('/facility', routes.facility);

// Start

const eraseDatabaseOnSync = true;
// Test setup
connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Booking.deleteMany({}),
      models.Facility.deleteMany({})
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
 
 let user1 = await models.User.create({username:'maneesh', password:'maneesh123'});

  const booking = new models.Booking({
    facility: "swimming",
    user: user1.id,
    startTime: 1575204302, 
    endTime: 1575204302 ,
  });

  const facility = new models.Facility({
    name: "swimming",
  });


  const facility1 = new models.Facility({
    name: "tennis",
  });


  await facility.save();
  await facility1.save();
  await booking.save();

};
