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
import Label from '../ui/Label.js';
import AwesomeTextInput from '../ui/AwesomeTextInput.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Comments extends React.Component{

  constructor (props) {
    super(props)

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2']),
    }
  }

  onSend() {

    console.log('hi there!!!!');
  }

  render() {
    // this.updateListView(['row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3']);

    return (
      <View style={styles.centerView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <Label>
              asdadsasdasd
              </Label>
            )
          }}/>

        <AwesomeTextInput onSend={ this.onSend } />
      </View>
    );
  }
}

var styles = StyleSheet.create({

  centerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: styleConfig.colors.text,
    padding: 10,
    paddingBottom: 30,
  },
  textInput: {
    position: 'absolute',
    width: width,
    bottom: 0,
    right: 0,
    backgroundColor: styleConfig.colors.text,
    borderTopWidth: 1,
    borderTopColor: styleConfig.colors.border,
    justifyContent: 'center'
  }
});
