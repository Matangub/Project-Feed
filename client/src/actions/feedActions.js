import styleConfig from '../util/styleConfig.js';
import axios from 'axios';

const serverAction = 'FEED';

export function getFeed(userId, socialProvider) {
  return function(dispatch) {

    var uri = `${styleConfig.credentials.host}/${socialProvider}/${serverAction}/${userId}`;
    return axios(uri).then( (response) => {

      dispatch({
        type: 'SET_FEED',
        payload: {
          socialProvider: socialProvider,
          feed: response.data
        }
      })
    })
    // return axios(uri).then( (response) => response.json() ).then( (response) => {
    //   console.log('response');
    //   console.log(response);
    //   dispatch({
    //     type: 'SET_FEED',
    //     payload: {
    //       socialProvider: socialProvider,
    //       feed: JSON.parse(response.response.body)
    //     }
    //   })
    // })
  }
}
