import user from "../models/user.js";

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