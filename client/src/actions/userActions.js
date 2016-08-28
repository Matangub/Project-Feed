import styleConfig from '../util/styleConfig.js';
import { AsyncStorage } from 'react-native';

import axios from 'axios';

export function getUser(userId) {
  return function(dispatch) {

    var uri = `${styleConfig.credentials.host}/${userId}`;
    // var uri = 'http://rest.learncode.academy/api/test123/tweets';

    return axios(uri).then( (response) => {
      dispatch({
        type: 'SET_USER',
        payload: { user: response.data }
      })

      AsyncStorage.setItem('userId', userId);
    }).catch( (err) =>  {
      // console.log('error');
      // console.log(err);
    })
  }
}
