import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {SET_HEADER_IMAGE} from '../actions/action';

const PostHeader = () => {
  const [headerData, setHeaderData] = useState({data: null});
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('https://www.reddit.com/r/meme/about.json')
      .then(function (res) {
        setHeaderData({
          data: res,
        });
        dispatch({
          type: SET_HEADER_IMAGE,
          payload: res.data.data.header_img,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <View>
      {headerData.data == null ? (
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 63,
            borderWidth: 1,
            borderColor: 'black',
            margin: 5,
          }}
          source={require('../assets/logo.png')}
          resizeMode={'cover'}
        />
      ) : (
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 63,
            borderWidth: 1,
            borderColor: 'black',
            margin: 5,
          }}
          source={{uri: headerData.data.data.data.header_img}}
          resizeMode={'cover'}
        />
      )}
    </View>
  );
};

export default PostHeader;
