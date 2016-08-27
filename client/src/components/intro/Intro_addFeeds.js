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
import { connect } from 'react-redux'
import * as userActions from '../../actions/userActions.js';

import Icon from 'react-native-vector-icons/EvilIcons';

import AwesomeButton from '../ui/AwesomeButton.js';
import SocialBox from '../ui/SocialBox.js';

import styleConfig from '../../util/styleConfig.js';
import Main from '../screens/Main.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

@connect( (store) => {
    return {
      user: store.user
    }
})
export default class Intro_addFeeds extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      socialProvides: [{
        name: 'facebook',
        backgroundColor: styleConfig.social.facebook
      },
      {
        name: 'twitter',
        backgroundColor: styleConfig.social.twitter
      },
      {
        name: 'instagram',
        backgroundColor: styleConfig.social.instagram
      },
      {
        name: 'linkedin',
        backgroundColor: styleConfig.social.linkedin
      }]
    };
  }

  componentDidMount() {
    this.props.dispatch( userActions.getUser(this.props.userId) );
  }

  leaveIntro() {
    this.props.showNavBar(true);

    _navigator.immediatelyResetRouteStack([{
      component: Main,
      title: 'test'
    }])
  }

  activeStatus (provider) {

    let returnStatement = false;
    this.props.user.providers.map( (item) => {

      if(item.provider == provider) {
        returnStatement = true;
      }
    })

    return returnStatement;
  }

  renderBoxes () {

    return this.state.socialProvides.map( (item, key) => {

      return (
        <SocialBox active={ this.activeStatus(item.name) } icon={`${item.name}`} key={key} backgroundColor={item.backgroundColor}>
          { item.name }
        </SocialBox>
      )
    })
  }

  render() {
    console.log( this.props.user );
    return (
      <View style={styles.centerView}>

        <Text style={{fontSize: 18, marginTop: 40, marginBottom: height/10, textAlign: 'center', color: '#fff'}}>
          Choose your social networks feeds
        </Text>

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
          Confirm
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
    backgroundColor: styleConfig.design.primary
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
