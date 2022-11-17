import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {t} from 'react-native-tailwindcss';
import Icon1 from 'react-native-vector-icons/Entypo';
import CommentIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useDispatch} from 'react-redux';
import * as Actions from '../actions/action';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostHeader from './PostHeader';

function Post({subRedditData, searchInput}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [subReddit, setSubReddit] = useState({
    data: null,
  });

  const commentData = (url, title, subreddit) => {
    const final_url = 'https://www.reddit.com' + url + '.json';
    axios.get(final_url).then(res => {
      dispatch({
        type: Actions.SET_COMMENTS_DATA,
        payload: {comm_data: res.data, title: title, subreddit: subreddit},
      });
      navigation.navigate('CommentScreen');
    });
  };

  useEffect(() => {
    if (subRedditData) {
      setSubReddit({data: subRedditData.data});
    }
  }, [subRedditData]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {subReddit.data == null ? (
        <View style={[t.bgGray800, t.justifyCenter, t.alignCenter, t.flex1]}>
          <ActivityIndicator size={'large'} color={'orange'} />
        </View>
      ) : (
        subReddit.data.data.children.map((item, index) => {
          return (
            <View
              key={index}
              style={[t.flexCol, t.justifyStart, t.itemsStart, t.mT1, t.mB3]}>
              <View
                style={[t.wFull, t.border, t.rounded, t.borderGray700, t.p2]}>
                <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
                  <PostHeader />

                  <View>
                    <Text
                      style={[t.textLg, t.textWhite, t.fontExtrabold, t.mL2]}>
                      {item.data.subreddit_name_prefixed}{' '}
                    </Text>
                    <Text style={[t.textSm, t.textWhite, t.mL2]}>
                      {item.data.author}
                    </Text>
                  </View>
                </View>
                <Text style={[t.textXl, t.textWhite, t.mT2, t.mB2]}>
                  {item.data.title}
                </Text>
                {item.data.thumbnail != 'self' && (
                  <View style={[t.flex1]}>
                    <Image
                      style={[{height: 300}, [t.wFull]]}
                      source={{uri: item.data.thumbnail}}
                      resizeMode={'contain'}
                    />
                  </View>
                )}
                <View
                  style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mT2]}>
                  <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
                    <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
                      <Icon1 name={'arrow-up'} color={'grey'} size={24} />
                      <Text style={[t.textSm, t.textWhite, t.mR2]}>
                        {item.data.ups}
                      </Text>
                    </View>
                    <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
                      <Icon1 name={'arrow-down'} color={'grey'} size={24} />
                      <Text style={[t.textSm, t.textWhite, t.mR2]}>
                        {item.data.downs}
                      </Text>
                    </View>
                  </View>
                  <CommentIcon
                    name={'comment'}
                    color={'grey'}
                    size={24}
                    onPress={() => {
                      commentData(
                        item.data.permalink,
                        item.data.title,
                        item.data.subreddit_name_prefixed,
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  subRedditData: state.reducer.subRedditData,
});

const mapDispatchToProps = dispatch => ({
  getSubredditData: data => {
    dispatch({type: Actions.REDDIT_DATA, payload: data});
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);
