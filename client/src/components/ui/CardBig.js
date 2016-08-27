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

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

import styleConfig from '../../util/styleConfig.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CardBig extends React.Component{

  propTypes: {
    title: React.propTypes.string,
    text: React.propTypes.string,
    banner: React.propTypes.string,
    media: React.propTypes.array,
  }

  static defaultProps = {
    title: '',
    text: '',
    banner: '',
    media: []
  }

  render() {
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
      mainContainer: {
        width: width,
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
        width: width-50,
        textAlign: 'left'
      },
      socialButtons: {
        flexDirection: 'row',
        alignItems: 'center'
      },
    })

    let myText = this.props.text;
    let timeAgo = moment( new Date(this.props.created_at) ).fromNow();

    return (
      <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.mainContainer}>

          <View style={{flex: 1, flexDirection: 'row'}}>

            <Image style={{height: 40, width: 40, borderRadius: 0, marginRight: 10}} source={ { uri: this.props.banner.length > 0 ? this.props.banner : null } } />
            <View style={styles.toolbar}>

              <View style={{flexDirection: 'row', marginBottom: 5, width: width-(width/4.5)}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={styles.toolbarButton}>{ this.props.title }</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.toolbarButton2}>@WIREDMAGAZINE</Text>
                  <Icon2 name="sc-twitter" style={{color: styleConfig.social.twitter, marginLeft: 5}} size={20} />
                </View>
              </View>

              <Text style={styles.toolbarButton2}> { timeAgo } </Text>

            </View>
          </View>
          <View style={{overflow: 'hidden'}}>
            <Text style={styles.toolbarTitle}>
            {
              ( (myText).length > 150 ) ? ( (myText).substring(0,150-3) + '...' ) : myText
            }
            </Text>

            {
              this.props.media.map( (item, key) => {

                return (

                  <Image key={key} style={{height: width/1.5, width: width, borderRadius: 0, marginRight: 10}} source={ {uri: item.media_url_https} } />
                )
              })
            }

            <View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 35, marginTop: 10}}>

                <TouchableNativeFeedback onPress={this.props.onCommentsPress} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon2 name="comment" style={{marginRight: 10}} size={25} />
                    <Text>110</Text>
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon2 name="heart" style={{marginRight: 10}} size={25} />
                    <Text>110</Text>
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon2 name="share-google" style={{marginRight: 10}} size={25} />
                    <Text>110</Text>
                  </View>
                </TouchableNativeFeedback>

              </View>
            </View>
          </View>

        </View>
      </TouchableNativeFeedback>
    );
  }
}
