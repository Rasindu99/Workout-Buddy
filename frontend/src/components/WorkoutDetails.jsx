import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { RiDeleteBinLine } from "react-icons/ri";
import {  formatDistanceToNow  } from 'date-fns'


const WorkoutDetails = ({ workout }) => {

  const {dispatch} = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`,{
      method: 'DELETE'
    });

    const data = await response.json(); // got the deleted workout

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: data})
    }
  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
      <span onClick={handleClick}> <RiDeleteBinLine /> </span>
    </div>
  )
}

export default WorkoutDetails
