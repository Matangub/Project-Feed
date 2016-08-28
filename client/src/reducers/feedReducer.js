export default function reducer( state={
  twitter: {
    data: [],
    fetching: true,
    fetchingMore: false,
    err: null
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
          fetching: false,
          fetchingMore: false,
          err: action.err
        }
      }
      break;
    }
    case 'INSERT_FEED': {
      var feed = JSON.parse(action.payload.feed.response.body);
      console.log('state');
      console.log(state);
      return {
        ...state,
        [action.payload.socialProvider]: {
          data: state[action.payload.socialProvider].data.concat(feed),
          fetching: false,
          fetchingMore: false,
          err: action.err
        }
      }
      break;
    }
    case 'SET_FETCHING_MORE': {

      return {
        ...state,
        [action.payload.socialProvider]: {
          data: state[action.payload.socialProvider].data,
          fetching: false,
          fetchingMore: true,
          err: action.err
        }
      }
      break;
    }
    default: return state;
  }
}
