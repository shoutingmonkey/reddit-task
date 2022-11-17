import React, {useState, useEffect} from 'react';
import {BackHandler, TextInput, ToastAndroid} from 'react-native';
import {SafeAreaView, View, Image, Text, ScrollView} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {connect} from 'react-redux';
import Post from '../components/Post';
import * as Actions from '../actions/action';

function PostScreen({navigation, getSubredditData}) {
  const [exitApp, setExitApp] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const url = `https://www.reddit.com/r/${
      searchInput ? searchInput : 'dankmemes'
    }/.json`;
    console.log(url);
    getSubredditData(url);
  }, [searchInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    const backAction = () => {
      if (exitApp === 0) {
        setExitApp(exitApp + 1);
        ToastAndroid.show('tap back again to exit the App', ToastAndroid.SHORT);
      } else if (exitApp === 1) {
        BackHandler.exitApp();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
      clearTimeout(timer);
    };
  }, [exitApp]);
  return (
    <SafeAreaView style={[t.hFull, t.p2, t.bgGray800]}>
      <View style={[t.flex1]}>
        <View style={[t.flexRow, t.justifyStart, t.itemsCenter, t.p1, t.pB2]}>
          <Image
            source={require('../assets/logo.png')}
            resizeMode="contain"
            style={[t.h10, t.w10]}
          />
          <Text style={[t.text2xl, t.textWhite, t.fontExtrabold, t.mL2]}>
            reddit
          </Text>
          <View style={[t.border, t.borderGray700, t.rounded, t.flex1, t.mL2]}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={'white'}
              cursorColor={'white'}
              value={searchInput}
              onChangeText={e => setSearchInput(e)}
            />
          </View>
        </View>
        <View style={[t.flex1]}>
          <ScrollView>
            <Post searchInput={searchInput} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getSubredditData: data =>
    dispatch({type: Actions.REDDIT_DATA, payload: data}),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
