import { combineReducers } from 'redux'
import auth_reducer from './auth_reducer'

// const action = {
//   type: 'changeState',
//   payload: { newState: 'new state triggered ' }
// }

// const reducer = (state, action)=> {
//   console.log(action)
//   if (action.type === 'changeState')
//     return action.payload.newState
//   return 'state'
// }
 const rootReducer =  combineReducers ({
   auth_user: auth_reducer
 })

export default rootReducer