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
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { Button, Icon } from 'react-native-material-design';

const width = Dimensions.get('window').width;

export default class AwesomeButton extends React.Component{

  propTypes: {
    iconName: React.propTypes.String,
    iconColor: React.propTypes.String,
    raised: React.propTypes.bool,
    precentWidth: React.propTypes.number,
    color: React.propTypes.string,
    size: React.propTypes.number,
    background: React.propTypes.string,
    height: React.propTypes.number,
    iconFirst: React.propTypes.bool,
    border: React.propTypes.bool,
    disabled: React.propTypes.bool,
    onPress: React.propTypes.func,

  }

  static defaultProps = {
    iconName: '',
    iconColor: '#fff',
    raised: false,
    precentWidth: 80,
    size: 30,
    color: '#fff',
    iconSize: 30,
    background: 'transparent',
    height: 50,
    iconFirst: true,
    border: false,
    disabled: false
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      buttonWrapper: {
        borderRadius: 3,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        height: this.props.height,
        width: width*(this.props.precentWidth/100),
        justifyContent: 'center'
      },
      borderDashed: {
        marginVertical: 5,
        height: 30,
        borderWidth: 1,
        borderStyle: 'dashed'
      },
      borderBottom: {
        height: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
      },
      borderBottomDashed: {
        marginVertical: 5,
        height: 30,
        borderBottomWidth: 1,
        borderStyle: 'dashed'
      }
    });

    if(!this.props.iconFirst) {

      return (
        <View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>

          <Button
          disabled={this.props.disabled}
          text={this.props.children}
          raised={this.props.raised}
          onPress={ this.props.onPress }
          overrides={{textColor: this.props.color, backgroundColor: this.props.background}} />

          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={ this.props.onPress }>
            <Icon name={this.props.iconName} size={ this.props.iconSize } color={this.props.iconColor} />
          </TouchableOpacity>

        </View>

        <View style={styles.borderBottom}></View>


        </View>
      );
    }

    return (
      <View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>

          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={ this.props.onPress }>
            <Icon name={this.props.iconName} size={ this.props.iconSize } color={this.props.iconColor} />
          </TouchableOpacity>

          <Button
          disabled={this.props.disabled}
          text={this.props.children}
          raised={this.props.raised}
          onPress={ this.props.onPress }
          overrides={{textColor: this.props.color, backgroundColor: this.props.background}} />


        </View>

        <View style={styles.borderBottom}></View>

      </View>
    );
  }
}
