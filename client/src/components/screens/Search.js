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
  ListView
} from 'react-native';

import styleConfig from '../../util/styleConfig.js';
import NotificationLabel from '../ui/NotificationLabel.js';

import Comments from './Comments.js'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Search extends React.Component{

  constructor (props) {
    super(props)
  }

  render() {

    return (
      <View style={styles.centerView}>
        <View>
          <Text>
            hello there search!
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({

  centerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: styleConfig.colors.border,
    padding: 10
  },
  socialListButton: {
    width: width,
    padding: 20
  },
  messageBox: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
