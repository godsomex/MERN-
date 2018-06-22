import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleWare = [thunk]

const initialState = {}

const storeWithMiddleWare = createStore(
    rootReducer,
    initialState,
    compose( 
        applyMiddleware(...middleWare), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

//console.log(storeWithMiddleWare.getState())
// console.log( store.dispatch (action) )

export default storeWithMiddleWare