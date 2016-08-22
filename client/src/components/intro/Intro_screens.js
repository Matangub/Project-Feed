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
  Dimensions
} from 'react-native';

import AwesomeButton from '../ui/AwesomeButton.js';
import styleConfig from '../../util/styleConfig.js';
import Intro_login from './Intro_login.js';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const pagesArray = [
  {
    id: 0,
    image: require('../../resources/images/wallpaper.png'),
    imageText: 'By click on this icon you can combine all of your feeds into one super feed!'
  },
  {
    id: 1,
    image: require('../../resources/images/wallpaper2.jpg'),
    imageText: 'Another screen!'
  }
]

export default class Intro_screens extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      screenState: 0
    }
  }

  nextScreen() {

    this.setState({screenState: this.state.screenState+1});
  }

  goToLogin(){

    // this.props.showNavBar(true);

    _navigator.push({
      component: Intro_login,
      title: 'Add Social Feeds'
    })
  }

  renderWelcome () {
    return (

      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: styleConfig.colors.primary }}>
        <View style={styles.imageContainer}>
          <Text style={{color: '#fff', fontSize: 36}}> Welcome </Text>
        </View>
        <View>

          <AwesomeButton iconName="forward" border="true" iconFirst={false} onPress={this.nextScreen.bind(this)} color="#fff" iconSize={35} background="red">
          Get started
          </AwesomeButton>

        </View>
      </View>
    )
  }

  renderPage (data) {

    var imgSrc = data.image;

    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: styleConfig.colors.primary }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={imgSrc} style={styles.image}/>

          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 10}}>
            { data.imageText }
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
          <AwesomeButton
            iconName="forward"
            border="true"
            iconFirst={false}
            onPress={ pagesArray.length-1 === data.id ? this.goToLogin : this.nextScreen.bind(this)}
            color="#fff"
            iconSize={35}>
              Next
          </AwesomeButton>
        </View>
      </View>
    );
  }

  render() {

    switch( this.state.screenState ) {

      case 0: return this.renderWelcome()

      case 1: return this.renderPage(pagesArray[0])

      case 2: return this.renderPage(pagesArray[1])

      default: return null;
    }
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
    marginTop: 10,
    width: width/1.2,
    height: height/1.4,
    resizeMode: 'cover',
  },
  imageContainer: {
    marginBottom: height/2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
