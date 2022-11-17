import React from 'react';
import Comment from './components/Comment';
import LoginScreen from './screens/LoginScreen';
import PostScreen from './screens/PostScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './store/store';
import {Provider} from 'react-redux';
import Auth from './components/Auth';

const Stack = createNativeStackNavigator();
global.Token = null;
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={PostScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="CommentScreen"
            component={Comment}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
