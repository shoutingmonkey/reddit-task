import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Platform,
  View,
  Image,
  Text,
  TextInput,
  BackHandler,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function Comment({commentData, headerImage}) {
  const [image_url, setImage_url] = useState(null);
  const [exitApp, setExitApp] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    const backAction = () => {
      if (exitApp === 0) {
        setExitApp(exitApp + 1);
        navigation.navigate('HomeScreen');
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

  useEffect(() => {
    if (headerImage) {
      setImage_url(headerImage);
    }
  }, [headerImage]);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[t.hFull, t.p2, t.bgGray800]}>
      {image_url == null ? (
        <View style={[t.bgGray800, t.justifyCenter, t.alignCenter, t.flex1]}>
          <ActivityIndicator size={'large'} color={'orange'} />
        </View>
      ) : (
        <View>
          <View style={[t.flexRow, t.justifyStart, t.itemsCenter, t.pB2]}>
            <Icon
              name={'arrow-left'}
              color={'white'}
              size={20}
              style={[t.m2]}
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <Image
              source={require('../assets/logo.png')}
              resizeMode="contain"
              style={[t.h10, t.w10]}
            />
            <Text style={[t.textXl, t.textWhite, t.fontExtrabold, t.mL4]}>
              Reddit
            </Text>
          </View>
          <View style={[t.flexCol, t.justifyStart, t.itemsStart, t.mT1, t.mB3]}>
            <View style={[t.wFull, t.border, t.rounded, t.borderGray700, t.p2]}>
              <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
                <Image
                  source={{uri: image_url}}
                  resizeMode="contain"
                  style={[t.h8, t.w8, t.border, t.borderWhite, t.roundedFull]}
                />
                <Text style={[t.textLg, t.textWhite, t.fontExtrabold, t.mL2]}>
                  {commentData.subreddit}{' '}
                </Text>
              </View>
              <Text style={[t.textXl, t.textWhite, t.mT2, t.mB2, t.fontBold]}>
                {commentData.title}
              </Text>

              <Text style={[t.textLg, t.textGray600, t.mT1, t.mB1]}>
                comments
              </Text>
              <ScrollView style={{height: 500}}>
                {commentData.comm_data.map((item, index) => {
                  return (
                    index != 0 &&
                    item.data.children.map((item1, index) => {
                      return (
                        <View key={index}>
                          {item.data.body !== ' ' ? (
                            <View
                              key={index}
                              style={[
                                t.flexRow,
                                t.justifyStart,
                                t.itemsStart,
                                t.mT2,
                                t.flex1,
                                t.mL3,
                              ]}>
                              <Icon
                                name={'corner-down-right'}
                                color={'grey'}
                                size={14}
                              />

                              <Text style={[t.textLg, t.textWhite, t.mL2]}>
                                {item1.data.body}{' '}
                              </Text>
                            </View>
                          ) : (
                            <View></View>
                          )}
                        </View>
                      );
                    })
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  commentData: state.reducer.commentData,
  headerImage: state.reducer.headerImage,
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
