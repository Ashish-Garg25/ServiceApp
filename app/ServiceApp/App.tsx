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
import {PermissionsAndroid, Platform} from 'react-native';
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
import HelpCenter from './src/screens/HelpCenter';
import PostDetails from './src/screens/PostDetails';
import ResetPassword from './src/screens/ResetPassword';
import TaskerRegisterScreen from './src/screens/Tasker/TaskerRegisterScreen';
import TaskerWelcome from './src/screens/Tasker/TaskerWelcomw';
import TaskerHome from './src/screens/Tasker/TaskerHome';
import TaskerTasks from './src/screens/Tasker/TaskerTasks';
import TaskerChat from './src/screens/Tasker/TaskerChat';
import TaskerProfile from './src/screens/Tasker/TaskerProfile';
import TaskerAccountSettings from './src/screens/Tasker/TaskerAccountSettings';
import TaskerTaskDetails from './src/screens/Tasker/TaskerTaskDetails';
import Terms from './src/screens/Terms';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomImage from './src/components/CustomImage';
import TaskerServiceOnboard from './src/screens/Tasker/TaskerServiceOnboard';
import TaskerService from './src/screens/Tasker/TaskerService';
import NotHiring from './src/screens/NotHiring';
import About from './src/screens/Tasker/About';

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
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 4,
          paddingBottom: 12,
          height: 60,
        },
      }}>
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
          tabBarIcon: () => <CustomImage />,
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
      <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
      <Stack.Screen name={'HelpCenter'} component={HelpCenter} />
      <Stack.Screen name={'Terms'} component={Terms} />
      <Stack.Screen name={'AccountSettings'} component={AccountSettings} />
      <Stack.Screen name={'Verification'} component={Verification} />
    </Stack.Navigator>
  );
};

const TaskerBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 4,
          paddingBottom: 12,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="TaskerHome"
        component={TaskerHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="TaskerTasks"
        component={TaskerTasks}
        options={{
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({color}) => <PostIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={TaskerChatStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color}) => <MessageIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={TaskerProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <CustomImage />,
        }}
      />
    </Tab.Navigator>
  );
};

const TaskerChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
};

const TaskerProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Profile'} component={TaskerProfile} />
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
      <Stack.Screen name={'HelpCenter'} component={HelpCenter} />
      <Stack.Screen
        name={'TaskerAccountSettings'}
        component={TaskerAccountSettings}
      />
      <Stack.Screen name={'About'} component={About} />
      <Stack.Screen name={'Terms'} component={Terms} />
    </Stack.Navigator>
  );
};

const TaskerRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TaskerWelcome" component={TaskerWelcome} />
      <Stack.Screen
        name="TaskerServiceOnboard"
        component={TaskerServiceOnboard}
      />
      <Stack.Screen name="TaskerService" component={TaskerService} />
      <Stack.Screen name="TaskerRegister" component={TaskerRegisterScreen} />
      <Stack.Screen name="TaskerBottomTab" component={TaskerBottomTab} />
      <Stack.Screen name="Message" component={TaskerChat} />
      <Stack.Screen name="TaskerTaskDetails" component={TaskerTaskDetails} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    getNotificationPermission();
    if (Platform.OS === 'ios') {
      const type = 'notification';
      PushNotificationIOS.addEventListener(type, onRemoteNotification);

      return () => {
        PushNotificationIOS.removeEventListener(type);
      };
    }
  });

  const getNotificationPermission = async () => {
    // await PushNotificationIOS.requestPermissions();
    // PushNotificationIOS.checkPermissions(permissions => {
    //   if (permissions.alert) {
    //     PushNotificationIOS.getInitialNotification().then(notification => {
    //       if (notification) {
    //         console.log('Initial Notification:', notification);
    //       }
    //     });
    //   } else {
    //     Alert.alert('Please grant notification permission!');
    //   }
    // });

    const result =
      Platform.OS === 'android'
        ? await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Service App wants to send you notifications',
              message: 'Enable notifications to receive job post updates 🥳.',
              buttonNegative: 'Cancel',
              buttonPositive: 'Grant',
            },
          )
        : await PushNotificationIOS.requestPermissions();

    const granted =
      Platform.OS === 'android'
        ? result === PermissionsAndroid.RESULTS.GRANTED
        : (!!result.alert as any);

    if (granted) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have opted in to receive notifications!',
      });
    }
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
    <GestureHandlerRootView style={{flex: 1}}>
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
            <Stack.Screen name={'SavedAddress'} component={SavedAddress} />
            <Stack.Screen name={'ManageAddress'} component={ManageAddress} />
            <Stack.Screen name={'Message'} component={Chat} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name={'PostDetails'} component={PostDetails} />
            <Stack.Screen name="TaskerRoutes" component={TaskerRoutes} />
            <Stack.Screen name="NotHiring" component={NotHiring} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={ToastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
