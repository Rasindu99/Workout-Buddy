const Workout = require('../models/workoutModel');


// GET all workout
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1}); 
  // sorted by descending or (-1) - newest one at the top
  // find({}) between curly brackets we can parse any condition to filter the result
  // Now we havent parsed any condition which means it gives us all the data from the Workout model
  res.status(200).json(workouts);
}


// GET single workout
const getSingleWorkout = async (req, res) => {

  const workout = res.workout; // await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }
  res.status(200).json(workout);
}


// CREATE new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body;

  let emptyFields = [];

  if(!title){
    emptyFields.push('title');
  }
  if(!load){
    emptyFields.push('load');
  }
  if(!reps){
    emptyFields.push('reps');
  }
  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    // return is used to stop the execution of the function
  }

  try {
    const workout = await Workout.create({title, load, reps}) // workout variable stores newly created document with its id
    res.status(201).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// DELETE workout
const deleteWorkout = async (req, res) => {
  try {
    await res.workout.deleteOne();
    res.json(res.workout);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting workout data' });
  }
}

// UPDATE workout
const updateWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(res.workout.id,{...req.body},{ new: true });/*
  The findByIdAndUpdate method updates a document in the database and returns the document as it was before the update, 
  not the updated document. By default, it returns the original document, not the updated one.
  To return the updated document, you need to pass an additional option { new: true } to the findByIdAndUpdate method. */
  res.status(200).json(workout);
}




// module is a inbuilt object , exports is a property of it to that property i am attching my all controller as a whole object
module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
}