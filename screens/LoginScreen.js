import axios from 'axios';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {connect} from 'react-redux';

const LoginScreen = ({navigation, token}) => {
  const [tokenId, setTokenId] = useState(null);
  const val = AsyncStorage.getItem('token');

  const getData = async key => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(
      getData('token')
        .then(value => {
          setTokenId(value);
        })
        .catch(err => console.log(err)),
    );

    if (tokenId) {
      navigation.navigate('HomeScreen');
      axios
        .get('https://oauth.reddit.com/api/v1/me', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + val,
          },
        })
        .then(function (res) {
          setUser({
            data: res.data,
          });
        })
        .catch(function (error) {});
    } else {
    }
  }, [tokenId]);
  return (
    <SafeAreaView style={[t.hFull, t.p2, t.bgGray800]}>
      {tokenId == null ? (
        <View>
          <View style={[t.flexRow, t.justifyCenter, t.itemsCenter]}>
            <Image
              source={require('../assets/logo.png')}
              resizeMode="contain"
              style={[t.h20, t.mT3]}
            />
          </View>
          <Text
            style={[
              t.text2xl,
              t.textWhite,
              t.textCenter,
              t.fontExtrabold,
              t.mT4,
            ]}>
            Login to Reddit
          </Text>
          <View style={[t.flexCol, t.justifyStart, t.itemsStart, t.pT5]}>
            <View style={[t.wFull, t.pT4]}>
              <View style={[t.wFull]}>
                <TouchableOpacity
                  activeOpacity="0.1"
                  style={[t.bgWhite, t.wFull]}
                  onPress={() => navigation.navigate('Auth')}>
                  <View
                    style={[
                      t.flexRow,
                      t.itemsCenter,
                      t.justifyCenter,
                      t.rounded,
                      t.p3,
                      t.bgRed600,
                    ]}>
                    <Text style={[t.textLg, t.textWhite, t.textCenter]}>
                      Sign Up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={[t.bgGray800, t.justifyCenter, t.alignCenter, t.flex1]}>
          <ActivityIndicator size={'large'} color={'orange'} />
        </View>
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  token: state.reducer.token,
});

const mapDispatchToProps = dispatch => ({
  // saveToken: data => dispatch({type: Actions.SET_TOKEN, payload: data}),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
