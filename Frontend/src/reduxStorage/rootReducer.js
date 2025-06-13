import { combineReducers } from 'redux'
import authReducer from '../ReduxFeatures/auth/auth.slice';
// import carpoolReducer from '../ReduxFeatures/carpool/carpool.slice';
// import carRentalReducer from '../ReduxFeatures/carrental/carrental.slice';
// import projectsReducer from  "../ReduxFeatures/projects/projects.slice";
// import lostnfoundReducer from "../ReduxFeatures/lostnfound/lostnfound.slice"

const rootReducer = combineReducers({
  auth: authReducer,
  // carpool: carpoolReducer,
//   carrental: carRentalReducer,
//   projects :projectsReducer,
//   lostnfound: lostnfoundReducer
})

export default rootReducer
