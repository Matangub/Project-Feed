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
  TextInput,
  Dimensions
} from 'react-native';

import styleConfig from '../../util/styleConfig.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons';

const width = Dimensions.get('window').width;

export default class SocialBox extends React.Component{

  render() {

    var boxStyle = {
      viewBox: {
        width: width/2.5,
        margin: 5,
        height: width/2.5,
        margin: 5,
        backgroundColor: `${this.props.backgroundColor}`,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: styleConfig.design.text,
        opacity: this.props.active ? 1 : 0.5,
      },
    };

    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={boxStyle.viewBox}>
          <Icon name={this.props.icon} size={35} color="#fff" />
          <Text style={{color: '#fff'}}>
          { this.props.children }
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
