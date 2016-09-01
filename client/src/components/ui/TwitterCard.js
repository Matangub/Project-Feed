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
  TouchableOpacity,
  WebView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Hyperlink from 'react-native-hyperlink';
import moment from 'moment';

import VideoPlayer from './VideoPlayer.js';
import {Video} from 'react-native-media-kit';

import styleConfig from '../../util/styleConfig.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class TwitterCard extends React.Component{

  propTypes: {
    rowData: React.propTypes.Object,
  }

  static defaultProps = {
    rowData: {}
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
    let cardData = this.props.rowData;
    let myText = cardData.text;
    let timeAgo = moment( new Date(cardData.created_at) ).fromNow();

    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
        {/* onPress={ this.props.MovetoComments.bind(this, cardData.id) } */}
        <View style={styles.mainContainer}>
          {  (cardData.retweet) ? <Text fontStyle="italic" style={{fontSize: 12, textAlign: 'left'}}>{ this.props.title } retweeted: </Text> : null }
          <View style={{flex: 1, flexDirection: 'row'}}>

            <Image style={{height: 40, width: 40, borderRadius: 0, marginRight: 10}} source={ { uri: cardData.banner.length > 0 ? cardData.banner : null } } />
            <View style={styles.toolbar}>

              <View style={{flexDirection: 'row', marginBottom: 5, width: width-(width/4.5)}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={styles.toolbarButton}>{ cardData.title }</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.toolbarButton2}> @{ cardData.name } </Text>
                  <Icon2 name="sc-twitter" style={{color: styleConfig.social.twitter, marginLeft: 5}} size={20} />
                </View>
              </View>

              <Text style={styles.toolbarButton2}> { timeAgo } </Text>

            </View>
          </View>
          <View>
            <Hyperlink onPress={ this.props.handleLink.bind(this) } linkStyle={{color:'#2980b9'}}>
                <Text style={[styles.toolbarTitle, {textAlign: 'auto'}]}>
                {
                  ( (myText).length > 150 ) ? ( (myText).substring(0,150-3) + '...' ) : myText
                }
                </Text>
            </Hyperlink>

            { cardData.media.map( this.renderMedia.bind(this) ) }

            {/* <View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 35, marginTop: 10}}>

                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon2 name="retweet" style={{marginRight: 10}} size={25} />
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this.props.set_like.bind(this, cardData.id, !cardData.like)} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon
                      name="ios-heart" color={ cardData.like ? '#C62828' : styleConfig.design.secondary }
                      style={{marginRight: 10}}
                      size={25} />
                    <Text> {cardData.likeCounter} </Text>
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon2 name="share-google" style={{marginRight: 10}} size={25} />
                  </View>
                </TouchableNativeFeedback>

              </View>
            </View> */}
          </View>

        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({

  card: {
    width: width,
    minHeight: 110,
    backgroundColor: styleConfig.colors.background,
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: styleConfig.colors.border,
    borderBottomWidth: 1,
  },
  cardTitle: {
    color: styleConfig.colors.cardText,
    fontSize: 18,
    margin: 0,
    padding: 0,
    flex: 1
  },
  backgroundVideo: {
    flex: 1,
    height: width/1.5
  },
  mainContainer: {
    padding:10,
    marginBottom: 15,
    backgroundColor: styleConfig.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: styleConfig.colors.border
  },
  toolbarButton: {
    color: styleConfig.colors.cardText
  },
  toolbarButton2: {
    color: styleConfig.colors.textFade,
    fontSize: 12,
    marginTop: 0,
  },
  toolbarButton3: {
    color: styleConfig.colors.textFade,
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toolbarTitle: {
    color: styleConfig.colors.cardText,
    textAlign: 'left'
  },
  socialButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
