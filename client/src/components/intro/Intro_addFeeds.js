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

import Icon from 'react-native-vector-icons/EvilIcons';

import AwesomeButton from '../ui/AwesomeButton.js';
import styleConfig from '../../util/styleConfig.js';
import Main from '../screens/Main.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Intro_addFeeds extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      socialProvides: [{
        name: 'facebook',
        backgroundColor: '#3b5998'
      },
      {
        name: 'twitter',
        backgroundColor: '#55acee'
      },
      {
        name: 'instagram',
        backgroundColor: '#f56040'
      },
      {
        name: 'linkedin',
        backgroundColor: '#0077b5'
      }]
    };
  }

  leaveIntro(){
    this.props.showNavBar(true);

    _navigator.immediatelyResetRouteStack([{
      component: Main,
      title: 'test'
    }])
  }

  renderBoxes () {


    return this.state.socialProvides.map( (item, key) => {

      var boxStyle = {
        viewBox: {
          width: width/2.5,
          margin: 5,
          height: width/2.5,
          margin: 5,
          backgroundColor: `${item.backgroundColor}`,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: styleConfig.colors.text,
        },
      };
      return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} key={key}>
          <View style={boxStyle.viewBox}>
              <Icon name={`sc-${item.name}`} size={35} color="#fff" />
              <Text style={{color: '#fff'}}>
                { item.name }
              </Text>
          </View>
        </TouchableNativeFeedback>
      )
    })
  }

  render() {

    return (
      <View style={styles.centerView}>

        <Text style={{fontSize: 18, marginTop: 40, marginBottom: height/10, textAlign: 'center', color: '#fff'}}>Choose at least one social feed to add to your feed</Text>

        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          { this.renderBoxes() }
        </View>

        <View style={{marginBottom: 30}}>
          <AwesomeButton
          iconName="forward"
          border="true"
          iconFirst={false}
          color="#fff"
          onPress={this.leaveIntro.bind(this)}
          iconSize={35}>
          Next
          </AwesomeButton>
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
    backgroundColor: styleConfig.colors.primary
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
