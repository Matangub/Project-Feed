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
  AsyncStorage,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import * as userActions from '../../actions/feedActions.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import styleConfig from '../../util/styleConfig.js';
import Card from '../ui/Card.js';
import CardBig from '../ui/CardBig.js';
import TabBar from '../ui/TabBar.js';

import Comments from './Comments.js'
import Notifications from './Notifications.js'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

@connect( (store) => {
    return {
      user: store.user,
      feed: store.feed
    }
})
export default class Main extends React.Component{

  constructor (props) {
    super(props)

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows( this.props.feed.twitter.data ),
    }
  }

  goToComments() {

    _navigator.push({
      component: Comments,
      title: 'Comments'
    })
  }

  componentDidMount() {
    this.fetchFeed();
  }

  componentWillReceiveProps( nextProps ) {

    this.updateListView(nextProps.feed.twitter.data);
  }

  fetchFeed() {
    this.props.dispatch( userActions.getFeed( this.props.user.userId, 'twitter' ) )
  }

  updateListView(moreData) {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(moreData)
    });
  }

  renderFeed() {

    return (
      <ListView
      dataSource={this.state.dataSource}
      enableEmptySections={ this.props.feed.twitter.data.length === 0 }
      renderRow={(rowData) => {
        console.log(rowData);
        return (
          <CardBig
          title={ rowData.user.name }
          text={ rowData.text }
          created_at={ rowData.created_at }
          banner={ rowData.user.profile_banner_url }
          media={ rowData.extended_entities ? rowData.extended_entities.media : [] }
          onCommentsPress={ this.goToComments } />
        )
      }}/>
    );
  }

  render() {

    return (

      <ScrollableTabView
      style={{marginTop: 5}}
      initialPage={0}
      tabBarPosition='bottom'
      renderTabBar={() => <TabBar />} >
        <ScrollView tabLabel="ios-paper" style={styles.tabView}>
          { this.renderFeed() }
        </ScrollView>
        <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
          <Notifications />
        </ScrollView>
        <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
          <View style={styles.card}>
          <Text>Messenger</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-people" style={styles.tabView}>
          <View style={styles.card}>
          <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-list" style={styles.tabView}>
          <View style={styles.card}>
          <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    )
  }
}

var styles = StyleSheet.create({

  centerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: styleConfig.colors.border
  },
  socialListButton: {
    padding: 5
  },
  messageBox: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
