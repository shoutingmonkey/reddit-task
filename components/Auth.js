import React, {useCallback, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize} from 'react-native-app-auth';
import {connect} from 'react-redux';
import * as Actions from '../actions/action';

function Auth({navigation, saveToken}) {
  const [apiData, setapiData] = useState({
    token: null,
    tokenExpiration: null,
    refreshToken: null,
  });

  const config = {
    redirectUrl: 'com.reddittask://oauth2redirect/reddit',
    clientId: 'kG-BRSjLS9bHBIfe4LUWWQ',
    clientSecret: '',
    scopes: [
      'identity',
      'edit',
      'subscribe',
      'save',
      'submit',
      'read',
      'modconfig',
      'account',
      'vote',
      'flair',
      'mysubreddits',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
      tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
      token: {
        Authorization: 'Basic ZmNhZll0Nl9PaHJsUUVONk5UVHlVUQ==',
      },
    },
  };

  const Auth = useCallback(async call => {
    try {
      const authState = await authorize(config);
      setapiData({
        token: authState.accessToken,
        tokenExpiration: authState.accessTokenExpirationDate,
        refreshToken: authState.refreshToken,
      });
      global.Token = authState.accessToken;
      await saveToken(global.Token);
      await AsyncStorage.setItem('token', global.Token);
      navigation.navigate('HomeScreen', {screen: 'Home'});
    } catch (e) {
      console.log(e);
    }
  });
  useEffect(() => {
    Auth();
  }, []);

  {
    !global.Token
      ? console.log('Token is ' + global.Token)
      : navigation.navigate('LoginScreen');
  }

  return <></>;
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  saveToken: data => dispatch({type: Actions.SET_TOKEN, payload: data}),
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
