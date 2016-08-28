import styleConfig from '../util/styleConfig.js';
import axios from 'axios';

export function get_twitter_feed(userId, socialProvider) {
  return function(dispatch) {

    var uri = `${styleConfig.credentials.host}/${socialProvider}/FEED/${userId}`;
    return axios(uri).then( (response) => {
      console.log('getting twitter api');

      dispatch({
        type: 'SET_FEED',
        payload: {
          socialProvider: socialProvider,
          feed: response.data,
          err: null
        }
      })
    }).catch( (err) =>  {

      console.log('err');
      console.log(err);
      dispatch({
        type: 'SET_FEED',
        payload: {
          socialProvider: socialProvider,
          feed: [],
          err: err
        },
      })
    })
  }
}

export function get_more_twitter_feed(userId, max_id, count) {
  return function(dispatch) {

    var uri = `${styleConfig.credentials.host}/twitter/MORE_FEED/${userId}?max_id=${max_id}&count=${count}`;

    dispatch({
      type: 'SET_FETCHING_MORE',
      payload: {
        socialProvider: 'twitter'
      }
    })

    return axios(uri).then( (response) => {
      console.log('getting more twitter api');

      dispatch({
        type: 'INSERT_FEED',
        payload: {
          socialProvider: 'twitter',
          feed: response.data,
          err: null
        }
      })
    }).catch( (err) =>  {

      console.log('err');
      console.log(err);
    })
  }
}
