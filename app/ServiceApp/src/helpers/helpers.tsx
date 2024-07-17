import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

navigator.geolocation = require('react-native-geolocation-service');

export function emptyString(str: string) {
  if (str === '') {
    return true;
  } else {
    return false;
  }
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

export async function requestLocation(callback: any) {
  try {
    let location;

    if (Platform.OS === 'ios') {
      const permission = await Geolocation.requestAuthorization('whenInUse');
      console.log(permission);
    } else {
      await PermissionsAndroid.request(
        'android.permission.ACCESS_FINE_LOCATION',
      );
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
