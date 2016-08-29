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
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Linking
} from 'react-native';
import { connect } from 'react-redux'
import * as userActions from '../../actions/feedActions.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import styleConfig from '../../util/styleConfig.js';
import Card from '../ui/Card.js';
import TwitterCard from '../ui/TwitterCard.js';
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
      isRefreshing: false,
      twitterFeedList: ds.cloneWithRows( this.props.feed.twitter.data ),
      feedScrollOffSet: 0,
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
    this.props.dispatch( userActions.get_twitter_feed( this.props.user.userId, 'twitter' ) )
  }

  fetchMoreFeed(socialProvider) {

    console.log('fetchMoreFeed');
    let feed = this.props.feed.twitter.data;
    this.props.dispatch( userActions.get_more_twitter_feed(
        this.props.user.userId,
        feed[ feed.length - 1 ].id,
        20
      )
    )
  }

  handleLink(link) {
    Linking.openURL(link).catch(err => console.error('An error occurred', err));
    // this.props.renderWebview( true, link )
  }

  updateListView(moreData) {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      twitterFeedList: ds.cloneWithRows(moreData)
    });
  }

  onFeedScroll(e) {
    let windowHeight = Dimensions.get('window').height;
    let height = e.nativeEvent.contentSize.height;
    let offset = e.nativeEvent.contentOffset.y;
    // console.log('offset', offset);

    if(offset > (this.state.feedScrollOffSet + 350) ) {

      // this.setState({feedScrollOffSet: offset})
      // console.log('this.state.feedScrollOffSet');
      // console.log(this.state.feedScrollOffSet);
    }
  }

  set_like(postId, value) {
    console.log('SET LIKE!!!');
    this.props.dispatch( userActions.twitter_toggle_like( this.props.user.userId, postId, value) )
  }

  renderFooter() {
    return (
      <View>
        <ActivityIndicator
          animating={this.props.feed.twitter.fetchingMore}
          color={`${styleConfig.design.primary}`}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      </View>
    )
  }

  renderFeed() {

    return (
      <ListView
      dataSource={this.state.twitterFeedList}
      enableEmptySections={ this.props.feed.twitter.data.length === 0 }
      // onEndReached={ this.fetchMoreFeed }
      // onEndReachedThreshold={100}
      renderFooter={ this.renderFooter.bind(this) }
      pageSize={1}
      renderRow={(rowData, sectionID, rowID) => {
        return (
          <View>
            {
              (rowData.retweeted_status) ?
                <TwitterCard
                  feedScrollOffSet={ this.state.feedScrollOffSet }
                  rowData={rowData}
                  handleLink={ this.handleLink.bind(this) }
                  set_like={ ( id, value ) => this.set_like(id, value) }
                  onCommentsPress={ this.goToComments } /> : null
            }
            <TwitterCard
              feedScrollOffSet={ this.state.feedScrollOffSet }
              rowData={rowData}
              handleLink={ this.handleLink.bind(this) }
              set_like={ ( id, value ) => this.set_like(id, value) }
              onCommentsPress={ this.goToComments } />
          </View>
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

        <ScrollView
          onScroll={ this.onFeedScroll.bind(this) }
          refreshControl={
              <RefreshControl
                  tintColor={styleConfig.design.primary}
                  title="Loading..."
                  titleColor={styleConfig.design.primary}
                  colors={[styleConfig.design.primary]}
                  refreshing={this.props.feed.twitter.fetching}
                  onRefresh={this.fetchFeed.bind(this)}
              />
          }
          tabLabel="ios-paper" style={styles.tabView}>

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
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
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
