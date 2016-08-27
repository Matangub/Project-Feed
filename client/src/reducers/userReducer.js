export default function reducer( state={
  email: null,
  loginProvider: null,
  name: null,
  providers: [],
  userId: null,
  userName: null
}, action) {

  switch(action.type) {

    case 'SET_USER': {

      return {
        ...state,
        ...action.payload.user
      }
      break;
    }
    default: return {...state}
  }
}
