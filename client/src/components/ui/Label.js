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

import VideoPlayer from './VideoPlayer.js';
import {Video} from 'react-native-media-kit';

import styleConfig from '../../util/styleConfig.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

const width = Dimensions.get('window').width;

export default class Label extends React.Component{

  propTypes: {
    image: React.propTypes.String,
    text: React.propTypes.String,
    name: React.propTypes.String,
    id: React.propTypes.String,
    created_at: React.propTypes.String,
  }

  static defaultProps = {
    image: ''
    // image: '../../resources/images/exampleImage.jpg'
  }

  renderImage (item, key) {

    return (

      <Image
        key={key}
        style={{height: width/1.5, width: width-20, borderRadius: 0, marginRight: 10}}
        source={ {uri: item.media} } />
    )
  }

  renderVideo (item, key) {
    return (
      <View key={key} style={{flex: 1}}>
        <Video
            style={{height: width / (16/9) }}
            src={item.videoLink}
            autoplay={false}
            preload={'auto'}
            loop={true}
            controls={true}
            muted={false}
            poster={item.media}
          />
      </View>
    )
  }

  renderMedia(item, key) {

    switch( item.type) {

      case 'photo': {
        return this.renderImage(item, key);
      }
      case 'video': {
        return this.renderVideo(item, key);
      }
      default: return null;
    }
  }

  render() {

    let myText = this.props.text;
    let timeAgo = moment( new Date(this.props.created_at) ).fromNow();

    return (
      <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.labelView}>
          <View style={styles.imageView}>
            <Image source={ require('../../resources/images/exampleImage.jpg') } style={{width: 40, height: 40}} />
          </View>

          <View>
            <View style={styles.topLabelStyle}>
              <Text style={styles.title}> {this.props.name} </Text>
              <Text style={styles.smallText}>{ timeAgo }</Text>
            </View>
            <Text style={{width: width/1.3}}>
              {
                ( (myText).length > 150 ) ? ( (myText).substring(0,150-3) + '...' ) : myText
              }
            </Text>

            { this.props.media.map( this.renderMedia.bind(this) ) }

            <View style={styles.bottomIcons}>

              <View style={styles.bottomIconsStyle}>
                <Icon2 name="comment" style={{marginRight: 10}} size={20} />
                <Text>
                  112
                </Text>
              </View>

              <View style={styles.bottomIconsStyle}>
                <Icon2 name="heart" style={{marginRight: 10}} size={20} />
                <Text>
                  5
                </Text>
              </View>

              <View style={styles.bottomIconsStyle}>
                <Icon2 name="share-google" style={{marginRight: 10}} size={20} />
              </View>

            </View>

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
    marginRight: 10
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
    fontSize: 12
  },
  bottomIcons: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 0,
  },
  bottomIconsStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
