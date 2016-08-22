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
  WebView
} from 'react-native';

import Button from '../ui/Button.js';
import Intro_addFeeds from './Intro_addFeeds.js';
import styleConfig from '../../util/styleConfig.js';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Intro_login extends React.Component{

  constructor (props) {
    super(props)

    this.state = {
      loginMechanisem: null
    }
  }

  leaveIntro(){

    // this.props.showNavBar(true);

    _navigator.immediatelyResetRouteStack([{
      component: Intro_addFeeds,
      title: 'Add Social Feeds'
    }])
  }

  renderWebView() {

    if(this.state.loginMechanisem === null) return null;

    return (
      <WebView
      source={{uri: `${styleConfig.credentials.host}/auth/${this.state.loginMechanisem}`}}
      style={{flex: 1, zIndex: 1, position: 'absolute', top: 0, right: 0, width: width, height: height}}
      />
    )
  }

  login(loginMechanisem) {

    this.setState({loginMechanisem: loginMechanisem});
  }

  render() {


    return (
      <View style={{flex: 1}}>
        { this.renderWebView() }
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: styleConfig.colors.primary }}>
          <View style={styles.imageContainer}>
            <Image source={require('../../resources/images/logo1.png')} style={styles.image}/>
            <Text style={{color: '#fff', fontSize: 18}}> One feed for all of your social feeds </Text>
          </View>
          <View>
            <Button iconName="sc-facebook" size={35} onPress={this.leaveIntro.bind(this)} background={styleConfig.social.facebook}>
            Connect with facebook
            </Button>

            <Button iconName="sc-twitter" size={35} onPress={this.login.bind(this, 'twitter')} background={styleConfig.social.twitter}>
            Connect with twitter
            </Button>

            {/* <Button iconName="sc-google-plus" size={35} background={styleConfig.social.google}>
            Connect with google
            </Button> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    marginBottom: 100,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    // marginTop: height*0.1
  },
  imageContainer: {
    marginBottom: height/3.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
