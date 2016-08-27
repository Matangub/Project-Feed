import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ToolbarAndroid,
  Image,
  TouchableNativeFeedback,
  Dimensions,
  ListView,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';
import styleConfig from '../../util/styleConfig.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CreatePost extends React.Component{

  render () {

    return (
      <View style={{flex: 1}}>
        <Text>
          new post
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
