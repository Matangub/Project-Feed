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

import styleConfig from '../../util/styleConfig.js';
import Card from '../ui/Card.js';
import CardBig from '../ui/CardBig.js';

import Comments from './Comments.js'
import Notifications from './Notifications.js'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Main extends React.Component{

  constructor (props) {
    super(props)

    AsyncStorage.setItem( 'hello', 'hello', () => {

        console.log( AsyncStorage.getItem('hello') );
    })

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3']),
    }
  }

  goToComments() {

    _navigator.push({
      component: Comments,
      title: 'Comments'
    })
  }

  updateListView(moreData) {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    setTimeout( () => {
      this.setState({
        dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3'])
      });
    }, 8000);
  }

  render() {
    console.log( 456789123 );
    // this.updateListView(['row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3']);

    return (
      <View style={styles.centerView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            switch(this.props.viewState) {
              case 'bigCard': {
                return (
                  <CardBig onCommentsPress={ this.goToComments }>
                  123
                  </CardBig>
                )
              }
              case 'normalCard': {

                return (
                  <Card>
                  123456
                  </Card>
                )
              }
              default: {
                return (
                  <CardBig>
                  123789
                  </CardBig>
                )
              }
            }
          }}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({

  centerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: styleConfig.colors.border
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
