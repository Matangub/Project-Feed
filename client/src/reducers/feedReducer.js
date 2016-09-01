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
      var feed = action.payload.feed;
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
      var feed = action.payload.feed;
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
    case 'SET_LIKE': {

      let feed = state[action.payload.socialProvider].data;

      for( let i = 0; i < feed.length; i++ ) {

        if(feed[i].id == action.payload.id) {

          feed[i].like = action.payload.like;

          let incrementBy = (action.payload.like) ? 1 : -1;
          feed[i].likeCounter = feed[i].likeCounter + incrementBy;
        }
      }

      return {
        ...state,
        [action.payload.socialProvider]: {
          data: feed,
          fetching: false,
          fetchingMore: false,
          err: action.err
        }
      }
    }
    case 'SET_REPLIES': {

      let params = action.payload;
      let newFeed = state[action.payload.socialProvider].data.map( (item) => {

        if(item.id == params.id) {
          item.replies = params.replies;

        }

        return item;
      })

      return {
        ...state,
        [action.payload.socialProvider]: {
          ...state[action.payload.socialProvider],
          data: newFeed
        }
      }
    }
    default: return state;
  }
}
