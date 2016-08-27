export default function reducer( state={
  twitter: {
    data: [],
    fetching: true
  },
  facebook: [],
  instagram: [],
  linkedin: []
}, action) {

  switch(action.type) {

    case 'SET_FEED': {
      var feed = JSON.parse(action.payload.feed.response.body);
      return {
        ...state,
        [action.payload.socialProvider]: {
          data: feed,
          fetching: false
        }
      }
    }
    default: return state
  }
}
