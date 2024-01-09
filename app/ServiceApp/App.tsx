/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './src/screens/Landing';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import ToastConfig from './src/utils/toast';
import Toast from 'react-native-toast-message';
import ChooseType from './src/screens/ChooseType';
import Home from './src/screens/Home';
import Post from './src/screens/Post';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from './src/assets/icons/Home';
import PostIcon from './src/assets/icons/PostIcon';
import {COLORS} from './src/utils/color';
import PostComplete from './src/screens/PostComplete';
import CreatePost from './src/screens/CreatePost';
import RegisterNext from './src/screens/RegisterNext';
import ProviderListings from './src/screens/ProviderListings';
import ProviderDetails from './src/screens/ProviderDetails';
import Profile from './src/screens/Profile';
import {Alert, Image, Platform} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ChatList from './src/screens/ChatList';
import MessageIcon from './src/assets/icons/MessageIcon';
import Chat from './src/screens/Chat';
import EditProfile from './src/screens/EditProfile';
import SavedAddress from './src/screens/SavedAddress';
import ManageAddress from './src/screens/ManageAddress';
import PushNotificationIOS, {
  PushNotification,
} from '@react-native-community/push-notification-ios';
import AccountSettings from './src/screens/AccountSettings';
import Verification from './src/screens/Verification';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
  },
};

export const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({color}) => <PostIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color}) => <MessageIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{width: wp('6%'), height: wp('6%'), borderRadius: 999}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Providers" component={ProviderListings} />
      <Stack.Screen name="ProviderDetails" component={ProviderDetails} />
    </Stack.Navigator>
  );
};

const PostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="PostComplete" component={PostComplete} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Chat'} component={ChatList} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen name={'SavedAddress'} component={SavedAddress} />
      <Stack.Screen name={'ManageAddress'} component={ManageAddress} />
      <Stack.Screen name={'AccountSettings'} component={AccountSettings} />
      <Stack.Screen name={'Verification'} component={Verification} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      getNotificationPermission();

      const type = 'notification';
      PushNotificationIOS.addEventListener(type, onRemoteNotification);

      return () => {
        PushNotificationIOS.removeEventListener(type);
      };
    }
  });

  const getNotificationPermission = async () => {
    await PushNotificationIOS.requestPermissions();
    PushNotificationIOS.checkPermissions(permissions => {
      if (permissions.alert) {
        PushNotificationIOS.getInitialNotification().then(notification => {
          if (notification) {
            console.log('Initial Notification:', notification);
          }
        });
      } else {
        Alert.alert('Please grant notification permission!');
      }
    });
  };

  const onRemoteNotification = (notification: PushNotification) => {
    const data = notification.getData();
    const isClicked = data.userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
    // Use the appropriate result based on what you needed to do for this notification
    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterNext" component={RegisterNext} />
          <Stack.Screen name="ChooseType" component={ChooseType} />
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name={'Message'} component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={ToastConfig} />
    </Provider>
  );
};

export default App;
