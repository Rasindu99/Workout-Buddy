import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    load: '',
    reps: '',
  });
  const[message, setMessage] = useState(null);
  const {dispatch} = useWorkoutsContext();
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(formData), // convert a JavaScript object into a JSON string
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json();

    if(response.ok){
      setMessage('New workout added!');
      setEmptyFields([]);
      dispatch({type: 'CREATE_WORKOUT', payload: data})
      setFormData({
        title: '',
        reps: '',
        load: '',
      });
    } else {
      setMessage('There was an error adding the workout')
      setEmptyFields(data.emptyFields);
    }
    

    // Clear the form fields after submission
    
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        id="load"
        name="load"
        value={formData.load}
        onChange={handleChange}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number"
        id="reps"
        name="reps"
        value={formData.reps}
        onChange={handleChange}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <button>Add Workout</button>
     {message && <div className={emptyFields.length > 0 ? "error" : "success"}>{message}</div>}
    </form>
    
  );
};

export default WorkoutForm;

