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

import styleConfig from '../../util/styleConfig.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

export default class NotificationLabel extends React.Component{

  propTypes: {
    image: React.propTypes.String
  }

  static defaultProps = {
    image: '../../resources/images/exampleImage.jpg'
  }

  render() {

    var myText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id metus vel lorem ullamcorper efficitur vel tristique risus. Fusce non laoreet nulla. Aliquam feugiat faucibus ipsum, nec dignissim massa mattis ac. Suspendisse nec ante orci. Nam ac efficitur ex. Morbi sapien felis, ornare et lacus quis, ultricies accumsan ipsum. Ut gravida lacus non eros dictum, gravida efficitur lorem euismod.';

    // <Image source={ require('../../resources/images/exampleImage.jpg') } style={{width: 40, height: 40}} />
    return (
      <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.labelView}>
          <View style={styles.imageView}>
            <Icon size={20} style={{backgroundColor: styleConfig.colors.primary, padding: 10, color: styleConfig.colors.text}} name="bell-o" />
          </View>

          <View>
            <View style={styles.topLabelStyle}>
              <Text style={styles.title}>Label Name</Text>
              <Text style={styles.smallText}>8 hr ago</Text>
            </View>
            <Text style={{width: width/1.3}}>
              Has shared something on facebook!
            </Text>

          </View>


        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  labelView: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: styleConfig.colors.border,
    paddingBottom: 10,
  },
  imageView: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '800'
  },
  topLabelStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  smallText: {
    fontSize: 12,
    marginRight: 10,
  },
  bottomIcons: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 0,
  },
  bottomIconsStyle: {
    flexDirection: 'row'
  }
});
