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
  WebView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import * as userActions from '../../actions/userActions.js';

import AwesomeButton from '../ui/AwesomeButton.js';
import styleConfig from '../../util/styleConfig.js';
import Intro_addFeeds from './Intro_addFeeds.js';
import Swiper from 'react-native-swiper';
import Button from '../ui/Button.js';
import Main from '../screens/Main';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const pagesArray = [
  {
    id: 0,
    image: require('../../resources/images/example.png'),
    imageText: 'By click on this icon you can combine all of your feeds into one super feed!'
  },
  {
    id: 1,
    image: require('../../resources/images/wallpaper2.jpg'),
    imageText: 'Another screen!'
  }
]

@connect()
export default class Intro_screens extends React.Component{

  constructor (props) {
    super(props)

    this.state = {
      loginMechanisem: null
    }
  }

  componentDidMount() {

    // AsyncStorage.getItem('userId').then( (value) => {
    //
    //   if(value) {
    //
    //     this.props.showNavBar(true);
    //
    //     _navigator.immediatelyResetRouteStack([{
    //       component: Main,
    //       title: 'Add Social Feeds',
    //       passProps: {
    //         userId: Main
    //       }
    //     }])
    //   }
    // });
  }

  nextScreen(userId){

    // this.props.showNavBar(true);

    _navigator.immediatelyResetRouteStack([{
      component: Intro_addFeeds,
      title: 'Add Social Feeds',
      passProps: {
        userId: userId
      }
    }])
  }

  onNavigationStateChange (data) {

    var url = data.url;

    if( (url.split('/').length -1 ) === 3 ) {

      var userId = url.substring( url.lastIndexOf('/')+1 );
      this.nextScreen(userId);
    }
  }

  onError() {

    console.log( 'onError' );
  }

  renderWebView() {

    if(this.state.loginMechanisem === null) return null;

    return (
      <WebView
      source={{uri: `${styleConfig.credentials.host}/auth/${this.state.loginMechanisem}?action=CONNECT`}}
      onNavigationStateChange={ this.onNavigationStateChange.bind(this) }
      // onLoadEnd={ this.nextScreen.bind(this) }
      style={{flex: 1, zIndex: 1, position: 'absolute', top: 0, right: 0, width: width, height: height}}
      />
    )
  }

  login(loginMechanisem) {

    this.setState({loginMechanisem: loginMechanisem});
  }

  render() {

    return (
      <View>
        { this.renderWebView() }
        <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, margin: 7}} />}
        >

          <View style={styles.slide}>
            <Image source={pagesArray[0].image} style={styles.image}/>
            <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at luctus mi, sed commodo felis. Morbi porttitor vestibulum rutrum. Duis
            </Text>
          </View>

          <View style={styles.slide}>
            <Text style={styles.text}>Beautiful</Text>
          </View>

          <View style={styles.slide}>
            <Text style={styles.text}>And simple</Text>
          </View>

          <View style={styles.slide}>

            <Button iconName="sc-facebook" size={35} onPress={this.nextScreen.bind(this)} background={styleConfig.design.primary}>
            Connect with facebook
            </Button>

            <Button iconName="sc-twitter" size={35} onPress={this.login.bind(this, 'twitter')} background={styleConfig.design.primary}>
            Connect with twitter
            </Button>

          </View>

        </Swiper>
      </View>
    )
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
        marginVertical: 50,
        width: width/1.3,
        height: 250,
        resizeMode: 'cover',
    },
    imageContainer: {
        marginBottom: height/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConfig.design.primary,
    },
    text: {
        color: styleConfig.design.text,
        fontSize: 18,
        textAlign: 'center'
    }
});
