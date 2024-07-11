import { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const Home = () => {

  // const [workouts, setWorkouts] = useState(null);
  const {workouts, dispatch} = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      
      // our backend server running on PORT 4000
      // our frontend server running on PORT 3001
      // CROS ORIGIN REQUESTS are default are not allowed for security reasons
      // To solve this have two solutions 1. INSTALL CORS (cross-origin-resource-sharing) 2. PROXY
      // PROXY --->
      // so we need to make a proxy server to make the request from frontend to backend
      // so that the backend server can respond to the frontend server

      try {
        const response = await fetch('/api/workouts/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }
    fetchWorkout();
  },[dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => {
          return (
            <WorkoutDetails key={workout._id} workout={workout}/>
          )
        })}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home