import PushNotificationIOS from '@react-native-community/push-notification-ios';

export function emptyString(str: string) {
  if (str === '') {
    return true;
  } else {
    return false;
  }
}

export function triggerLocalNotification() {
  const randomFourDigitNumber = Math.floor(Math.random() * 9000) + 1000;

  const fireDate = new Date();
  fireDate.setSeconds(fireDate.getSeconds() + 5);

  PushNotificationIOS.addNotificationRequest({
    id: String(randomFourDigitNumber),
    title: 'Service App',
    body: 'Sarah Dame sent you a request',
    fireDate: fireDate as any, // triggers the notification immediately
  });
}
