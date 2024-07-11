const mongoose = require('mongoose');
// mongoDB alone is scema less

const Schema = mongoose.Schema;

// this define what should workout object looklike 
// parsed two parameters first define the structure of the document 
// second timesStamp when we create a document it automatically adds created on property for us (updated data also)
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

// name of the model automatically pluralize by the nodejs
const Workout = mongoose.model('Workout', workoutSchema);

// Export the model
module.exports = Workout;
