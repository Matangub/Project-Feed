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
  TextInput
} from 'react-native';

import styleConfig from '../../util/styleConfig.js';
import Icon from 'react-native-vector-icons/FontAwesome';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class AwesomeTextInput extends React.Component{

  constructor (props) {
    super(props)

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2']),
    }
  }

  render() {

    return (
      <View style={styles.textInput}>
        <TextInput
          {...this.props}
          editable = {true}
          placeholder={"Share you thoughts with the world!"}
          placeholderTextColor={ styleConfig.colors.border }
          style={{width: width-50}}
          multiline={true}
          underlineColorAndroid={styleConfig.colors.primary}
          maxLength = { 240 }
        />

        <Icon name="arrow-circle-right" onPress={ this.props.onSend } style={styles.sendIcon} size={30} />
      </View>
    );
  }
}

var styles = StyleSheet.create({

  textInput: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    width: width,
    bottom: 0,
    right: 0,
    backgroundColor: styleConfig.colors.text,
    borderTopWidth: 1,
    borderTopColor: styleConfig.colors.border,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: styleConfig.colors.primary,
    marginHorizontal: 10,
  }
});
