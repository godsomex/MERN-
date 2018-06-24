import { TEST_USERS} from './types'

export const registerUser = (userData) => {
    //dispatch an action to our reducer
    return {
        type : TEST_USERS,
        payload : userData
    }
}