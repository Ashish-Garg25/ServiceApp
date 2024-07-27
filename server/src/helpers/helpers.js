import user from "../models/user.js";
import { getMessaging } from "firebase-admin/messaging";

export async function checkIfExist(email){
const userFound = await user.findOne({
    email
  });

  console.log(userFound)

  if (userFound) {
    return { userFound, exist: true}
  } else {
    return { userFound: null, exist: false}
  }
} 

export async function sendPushNotification(registrationToken, content){
  try{
    if(registrationToken && content){
      const message = {
        data: content,
        token: registrationToken
      };
      
      // Send a message to the device corresponding to the provided
      // registration token.
      getMessaging().send(message)
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    }
  }catch(err){
    console.log('err', err)
  }
}