import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

navigator.geolocation = require('react-native-geolocation-service');

export function emptyString(str: string) {
  if (str === '') {
    return true;
  } else {
    return false;
  }
}

export function getCharAt(str: string, position: number): String {
  return str?.toUpperCase()?.charAt(position);
}

export function triggerLocalNotification() {
  PushNotification.configure({
    onRegister: function (token: any) {
      console.log('TOKEN:', token);
    },

    // (required)
    onNotification: function (notification: {finish: (arg0: string) => void}) {
      console.log('REMOTE NOTIFICATION ==>', notification);

      // process the notification here

      // required on iOS
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional)
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}

export async function getDeviceToken() {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      return fcmToken;
    } else {
      return '';
    }
  } catch (err) {
    console.log('err', err);
    return '';
  }
}

export async function requestLocation(callback: any) {
  try {
    let location;

    if (Platform.OS === 'ios') {
      const permission = await Geolocation.requestAuthorization('whenInUse');
      console.log(permission);
    } else {
      const permission = await PermissionsAndroid.request(
        'android.permission.ACCESS_FINE_LOCATION',
      );
      console.log(permission);
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        location = await getAddress(latitude, longitude);
        callback(location);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  } catch (e) {
    console.log(e);
  }
}

const getAddress = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyALXQL_Sn6aM-gxI3eqAEBhsBMV3tZGFY0`,
  );
  const converted = await response.json();

  const formattedAddress =
    converted.results[0]?.formatted_address || 'Address not found';

  return formattedAddress;
  // setLocation(formattedAddress);
  // handleLocation(formattedAddress);
};

export function formatDate(dateString: any) {
  // Split the date string into parts
  const parts = dateString.split('-');

  if (parts.length === 3) {
    // Format YYYY-MM-DD
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Create a new Date object
    const date = new Date(year, month - 1, day);

    // Get day and month names
    const dayName = date.toLocaleDateString('en-US', {day: 'numeric'});
    const monthName = date.toLocaleDateString('en-US', {month: 'short'});

    // Return formatted date
    return `${dayName} ${monthName}`;
  } else if (parts.length === 2) {
    // Format YYYY-MM
    const month = parseInt(parts[1], 10);

    // Create a new Date object
    const date = new Date(2000, month - 1, 1); // The day is arbitrary

    // Get month name
    const monthName = date.toLocaleDateString('en-US', {month: 'short'});

    // Return formatted month
    return monthName;
  } else if (parts.length === 1) {
    // Format YYYY
    return dateString;
  } else {
    // Handle unexpected format
    return 'Invalid date format';
  }
}
