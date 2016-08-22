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

import Icon from 'react-native-vector-icons/FontAwesome';

import styleConfig from '../../util/styleConfig.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CardBig extends React.Component{

  propTypes: {

  }

  static defaultProps = {

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
        width: width,
      },
      socialButtons: {
        flexDirection: 'row',
        alignItems: 'center'
      },
    })

    var mytext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed nulla ultrices, sodales augue et, aliquet leo. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue pharetra ornare. Integer mi ligula, dapibus in tincidunt ac, consequat vel ex. Integer sit amet egestas dui, rhoncus rhoncus mi. Fusce eros arcu, consectetur et sem in, cursus tristique nibh. Aenean porta erat nulla. Nullam id suscipit est. Quisque gravida massa eu rhoncus egestas. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam lobortis lacinia hendrerit. Aliquam urna elit, aliquet vitae interdum et, congue eu massa. Aenean vitae mattis ex."

    return (
      <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.mainContainer}>

          <View style={{flex: 1, flexDirection: 'row'}}>

            <Image style={{height: 40, width: 40, borderRadius: 0, marginRight: 10}} source={ require('../../resources/images/exampleImage.jpg') } />
            <View style={styles.toolbar}>

              <View style={{flexDirection: 'row', marginBottom: 5, width: width-(width/4.5)}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={styles.toolbarButton}>Wired</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.toolbarButton2}>@WIREDMAGAZINE</Text>
                  <Icon name="twitter" style={{color: styleConfig.social.twitter, marginLeft: 5}} size={20} />
                </View>
              </View>

              <Text style={styles.toolbarButton2}>8 hr ago</Text>

            </View>
          </View>
          <View style={{overflow: 'hidden'}}>
            <Text style={styles.toolbarTitle}>
            {
              ( (mytext).length > 150 ) ? ( (mytext).substring(0,150-3) + '...' ) : mytext
            }
            </Text>
            <Image style={{height: width/1.5, width: width, borderRadius: 0, marginRight: 10}} source={ require('../../resources/images/exampleImage.jpg') } />

            <View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 35, marginTop: 10}}>

                <TouchableNativeFeedback onPress={this.props.onCommentsPress} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon name="comment" style={{marginRight: 10}} size={25} />
                    <Text>110</Text>
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon name="heart" style={{marginRight: 10}} size={25} />
                    <Text>110</Text>
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this._onPressButton} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.socialButtons}>
                    <Icon name="share-alt" style={{marginRight: 10}} size={25} />
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
