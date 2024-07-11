import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
    // i am parsing ...state into childreb component instead of state , becase if i parse state then children have to access its properties 
    // by state.workouts
    // but if i parse ...state then children can access its properties directly
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}