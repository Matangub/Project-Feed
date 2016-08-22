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

import Icon from 'react-native-vector-icons/EvilIcons';

const width = Dimensions.get('window').width;

export default class Intro_login extends React.Component{

  propTypes: {
    iconName: React.propTypes.String,
    precentWidth: React.propTypes.number,
    size: React.propTypes.number,
    backgroundColor: React.propTypes.string,
    onPress: React.propTypes.func
  }

  static defaultProps = {
    iconName: 'archive',
    size: 30,
    background: 'transparent',
    precentWidth: 80,
    borderWidth: 1,
    height: 50
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      buttonWrapper: {
        borderWidth: this.props.borderWidth,
        borderRadius: 3,
        borderColor: '#fff',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 10
      },
      button: { height: this.props.height, width: width*(this.props.precentWidth/100), justifyContent: 'center'}
    });

    const myButton = (
      <View style={styles.buttonWrapper}>
        <Icon.Button style={styles.button} name={this.props.iconName} size={this.props.size} backgroundColor={this.props.background} onPress={this.props.onPress}>
            <Text style={{textAlign:'center', color: '#fff'}}>
              {this.props.children}
            </Text>
        </Icon.Button>
      </View>
    );

    return (
      <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
        <Text>
        { myButton }
        </Text>
      </TouchableNativeFeedback>
    );
  }
}
