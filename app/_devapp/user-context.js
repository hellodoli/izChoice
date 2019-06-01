import React from 'react';
//import UserModel from './model/User';

/*var userInfo = [];

async function checkUserExist() {
    const user = new UserModel();
    await user.getUser();
    userInfo = user.userInfo;
    console.log(userInfo);
}

checkUserExist();

export const users = {
    userInfo: userInfo,
    isLogin: ( userInfo.length > 0 ) ? true : false
}*/

export const UserContext = React.createContext({
    userInfo: [],
    isLogin: false
});