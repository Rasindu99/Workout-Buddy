const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

app.use(express.json());
// if user request have some body to the request, so some data that we are sending to the server , then
// express.json() will parse , and attach that data to the request obj and then we can access it in the request body

/*
app.use((req, res, next) => {
  console.log('This is middleware')
  console.log(req.path, req.method)
  next();
}) */   

// Routes
app.use('/api/workouts', workoutRoutes);  // when we fire request to /api/workouts, then i want to use these workoutRoutes

app.get('/', (req, res) => {
  console.log('GET method')
  res.json({ message: 'Hello World!!!123' });
})

// connect mongoDB
mongoose.connect(process.env.MONGO_DB_URL) //async function
  .then(() => {
    console.log('Database connected')
    // Listen for requests
    app.listen(process.env.PORT || 4000 , () => {
    console.log('Server is running on port !!!', process.env.PORT);
})
  })
  .catch((error) => {
    console.log(error);
  })


