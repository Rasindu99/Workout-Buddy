const express = require('express');
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const { 
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts)


router.get('/menu', (req, res) => {
  res.send('This is workout menu');
})


// GET single workout
router.get('/:id', findSingleWorkout, getSingleWorkout);


// POST a new workout
router.post('/', createWorkout)


// DELETE a workout
router.delete('/:id', findSingleWorkout, deleteWorkout)


// UPDATE a workout
router.patch('/:id', findSingleWorkout, updateWorkout) 


async function findSingleWorkout(req, res, next) {
  let workout;
  try {
    const workoutId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(workoutId)){
      return res.status(404).json({error: 'id of the workout is invalid'})
    }

    workout = await Workout.findById(workoutId)
    if(workout == null) {
      return res.status(404).json({error: error.message});
    }
  } catch (error) {
    return res.status(500).json({error: 'Cant find such a workout'})
  }
  res.workout = workout;
  console.log(res.workout.id);
  next();
}

module.exports = router;