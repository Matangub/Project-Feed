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
  ListView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux'
import * as feedActions from '../../actions/feedActions.js';

import styleConfig from '../../util/styleConfig.js';
import Label from '../ui/Label.js';
import AwesomeTextInput from '../ui/AwesomeTextInput.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

@connect( (store) => {
    return {
      user: store.user,
      feed: store.feed
    }
})
export default class Comments extends React.Component{

  constructor (props) {
    super(props)

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let socialProvider = 'twitter';
    console.log('this.props.feed[socialProvider].data');
    console.log(this.props.feed[socialProvider].data);
    this.state = {
      socialProvider: socialProvider,
      replies: ds.cloneWithRows( [] ),
    }
  }

  componentWillMount() {

    // setTimeout( () => {
    //
    //   console.log('this.getTweetItem()');
    //   let replies = this.getTweetItem()[0].replies
    //   console.log('replies');
    //   console.log(replies);
    //   this.updateListView( replies )
    // }, 300);
    this.props.dispatch(feedActions.get_replies(this.props.user.userId, this.props.id));

  }

  componentWillReceiveProps(nextProps) {
    console.log('111')
    this.updateListView( this.getTweetItem()[0].replies );
  }

  getTweetItem () {

    let socialProvider = this.state.socialProvider;

    return this.props.feed[socialProvider].data.filter( (item) => {

        if(item.id == this.props.id) {
          return item;
        }
    })
  }

  updateListView(moreData) {

    console.log('moreData');
    console.log(moreData);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(moreData) {

      this.setState({
        replies: ds.cloneWithRows(moreData)
      });
    }
    else {
      let a = this.getTweetItem();
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      console.log(a)
    }
  }

  onSend() {

    console.log('hi there!!!!');
  }

  render() {
    // this.updateListView(['row 1', 'row 2', 'row3', 'row 1', 'row 2', 'row3']);
    let socialProvider = this.state.socialProvider;
    let isEmpty = this.props.feed[socialProvider].data.replies ? this.props.feed[socialProvider].data.replies.length : 0

    return (
      <View style={styles.centerView}>
        <ListView
          enableEmptySections={ true }
          dataSource={this.state.replies}
          renderRow={(rowData) => {
            console.log('rowData')
            console.log(rowData)
            return (
              <Label text={ rowData.text } media={ rowData.media ? rowData.media : [] } name={ rowData.user.name } id={ rowData.user.id }  />
            )
          }}/>

        <AwesomeTextInput onSend={ this.onSend } />
      </View>
    );
  }
}

var styles = StyleSheet.create({

  centerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: styleConfig.colors.text,
    padding: 10,
    paddingBottom: 30,
  },
  textInput: {
    position: 'absolute',
    width: width,
    bottom: 0,
    right: 0,
    backgroundColor: styleConfig.colors.text,
    borderTopWidth: 1,
    borderTopColor: styleConfig.colors.border,
    justifyContent: 'center'
  }
});
