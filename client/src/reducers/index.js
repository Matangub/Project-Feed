import { combineReducers } from 'redux';

// import twitterReducer from './twitterReducer';
import feed from './feedReducer';
import user from './userReducer.js';

export default combineReducers({
  feed,
  user
});
// import feedReducer from './feedReducer';
// import userReducer from './userReducer.js';
//
// export default combineReducers({
//   feed: feedReducer,
//   user: userReducer
// });
