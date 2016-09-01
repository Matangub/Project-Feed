/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 /*
 adb logcat *:S ReactNative:V ReactNativeJS:V
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ToolbarAndroid,
  InteractionManager,
  TouchableNativeFeedback,
  Dimensions,
  BackAndroid,
  TextInput,
  AsyncStorage,
  WebView
} from 'react-native';

import { Provider } from 'react-redux';
import store from './src/store.js';

import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
// import Webbrowser from 'react-native-webbrowser';
// var WebViewBridge = require('react-native-webview-bridge');

import Button from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import Intro_screens from './src/components/intro/Intro_screens';
import Main from './src/components/screens/Main';
import Notifications from './src/components/screens/Notifications';
import Search from './src/components/screens/Search';
import AwesomeTextInput from './src/components/ui/AwesomeTextInput.js';

import styleConfig from './src/util/styleConfig.js';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flexDirection: 'row',
    position:'absolute',
    top:0,
    left:0,
    backgroundColor: styleConfig.colors.primary,
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  navIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  navWrapper: {
    padding: 5,
    flex: 1,
    flexDirection: 'row'
  },
  bottomTabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width,
    paddingHorizontal: 30
  },
  text: {
    color: styleConfig.colors.text,
  },
  menu: {
    width: width-20,
    backgroundColor: styleConfig.colors.text,
    margin: 10,
    marginVertical: 20,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuSeperator: {
    borderBottomWidth: 1,
    width: width,
    borderBottomColor: styleConfig.colors.primary,
  },
  iconView: {flex: 1, flexDirection: 'row', marginVertical: 25, justifyContent: 'center', alignItems: 'center'}
});

class client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
      showMenu: false,
      viewState: 'bigCard',
      activeTab: 'Main',
      userId: null,
      initialComponent: Intro_screens,
      renderWebview: false,
      webViewLink: null
    };
  }

  componentWillMount(){
    // AsyncStorage.getItem('userId').then( (value) => {
    //   console.log('value', value)
    //   if( value.length > 0 ) {
    //
    //     this.setState({ userId: value, showNav: true, initialComponent: Main})
    //   } else {
    //
    //     this.setState({ userId: null, showNav: false, initialComponent: Intro_screens})
    //   }
    // })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (_navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      _navigator.pop();
      return true;
    });
  }

  showNavBar(condition) {

    this.setState({ showNav: condition })
  }

  renderBottomTabs () {

    const setTabColor = (tab) => {

      return (this.state.activeTab === tab) ? styleConfig.colors.primary : styleConfig.colors.border;
    }

    const changeTab = (component) => {

      switch(component) {
        case 'Main': {

          _navigator.immediatelyResetRouteStack([{component: Main}])
          break;
        }
        case 'Notifications': {

          _navigator.immediatelyResetRouteStack([{component: Notifications}])
          break;
        }
        case 'Search': {

          _navigator.immediatelyResetRouteStack([{component: Search}])
          break;
        }
        default: {

          _navigator.immediatelyResetRouteStack([{component: Main}])
        }
      }

      this.setState({activeTab: component})
    }

    return (
      <View style={{height: 55, borderTopWidth: 1, borderTopColor: styleConfig.colors.border }}>
        <View style={styles.bottomTabs}>
          <Icon2.Button size={25} onPress={ changeTab.bind(this, 'Main') } name="home" backgroundColor={ '#fff' } color={ setTabColor('Main') } />
          <Icon2.Button size={25} onPress={ changeTab.bind(this, 'Notifications') } name="bell-o" backgroundColor={ '#fff' } color={ setTabColor('Notifications') } />
          <Icon2.Button size={25} onPress={ changeTab.bind(this, 'Search') } name="search" backgroundColor={ '#fff' } color={ setTabColor('Search') } />
          <Icon2.Button size={25} name="bars" backgroundColor={ '#fff' } color={ styleConfig.colors.border } />
        </View>
      </View>
    )
  }

  renderLink (showWebView, link=null) {

    console.log(showWebView, link);
    this.showNavBar(!showWebView);

    this.setState({
      renderWebview: showWebView,
      webViewLink: link
    })
  }

  renderWebview () {

    if(!this.state.renderWebview) return null;

    return (
      <View style={{flex: 1}}>
          {/* <Webbrowser
                url={ this.state.webViewLink }
                hideHomeButton={false}
                hideToolbar={false}
                hideAddressBar={false}
                hideStatusBar={false}
                foregroundColor={'#efefef'}
                backgroundColor={'#333'} /> */}
        {/* <View style={{flexDirection: 'row', backgroundColor: styleConfig.design.primary}}>
          <TouchableNativeFeedback onPress={ this.renderLink.bind(this, false) } background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.socialButtons}>
              <Icon2.Button
                name="close"
                backgroundColor={ styleConfig.design.primary }
                onPress={ this.renderLink.bind(this, false) }
                style={{margin: 10}}
                size={25} />
            </View>
          </TouchableNativeFeedback>
        </View>
        <WebView
        source={{uri: this.state.webViewLink}}
        style={{position: 'absolute', height: height, width: width, top: 0, right: 0, zIndex: 1}}
        /> */}
      </View>
    )

  }

  renderScene(route, navigator) {

    _navigator = navigator;
    
    return (
      <View style={{flex: 1}}>
        { this.renderWebview.bind(this)() }
        <route.component viewState={this.state.viewState} renderWebview={this.renderLink.bind(this)} showNavBar={this.showNavBar.bind(this)} navigator={navigator} {...route} { ...route.passProps} />
        {/* { (this.state.showNav) ? this.renderBottomTabs() : null } */}
      </View>
    );
  }

  configureScene(route, routeStack){
    return Navigator.SceneConfigs.PushFromRight
  }

  toggleMenu (viewState) {
    this.setState({showMenu: !this.state.showMenu, viewState: viewState})
  }

  routeMap(self) {
    if(!self.state.showNav) return {
      LeftButton() { return null; },

      RightButton() { return null; },

      Title() { return null; }
    };

    const navStyle = StyleSheet.create({
      TextInput: {
        width: width - 20,
        color: styleConfig.design.text
      }
    })

    const renderBackButton = (index, navigator) => {

      return (
        <Icon.Button
        onPress={() => { if (index > 0) { navigator.pop() } }}
        name="arrow-left"
        size={35}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        backgroundColor={ styleConfig.design.primary }
        color={styleConfig.colors.text} />
      )
    }

    return {
      LeftButton(route, navigator, index, navState) {

        return (
          <View style={styles.navWrapper}>

            { index > 0 ? renderBackButton(index, navigator) : null }

            <TextInput
            placeholder="Search..."
            placeholderTextColor={ styleConfig.design.border }
            underlineColorAndroid={ styleConfig.design.border }
            selectionColor={ styleConfig.design.text }
            style={navStyle.TextInput}
            editable={true}
            maxLength = {60} />
          </View>
        );
      },

      RightButton(route, navigator, index, navState) {

        // <Icon2.Button size={25} name="ellipsis-v" iconStyle={{paddingLeft: 10}} backgroundColor={ styleConfig.colors.primary } onPress={ self.toggleMenu.bind(self, 'bigCard') } />
        return (
          <View style={styles.navIcons}>
          </View>
         )
      },

      Title(route, navigator, index, navState) {
        return (
          null
        )
      }
    };
  }

  renderNavigator() {

    return (
      <Provider store={store} >
        <Navigator navigationBar={
          <Navigator.NavigationBar
          style={ (this.state.showNav) ? {
            ...styles.toolbar,
            backgroundColor: styleConfig.design.primary,
            borderBottomWidth: 1,
            borderBottomColor: styleConfig.design.border,
          } : {} }
          routeMapper={ this.routeMap(this) } />
        }
        sceneStyle={(this.state.showNav) ? {marginTop: 55} : {}}
        configureScene={ this.configureScene }
        initialRoute={{ component: this.state.initialComponent }}
        renderScene={this.renderScene.bind(this)} />
      </Provider>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.renderNavigator() }
      </View>
    )
  }
}

AppRegistry.registerComponent('client', () => client);
