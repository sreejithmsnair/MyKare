import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const [profile, setProfile] = useState([]);
  const [regUserData, setRegUserData] = useState([]);

  const loadProfile = async () => {
    let prof = await AsyncStorage.getItem('profile');
    if (!prof) {
      let obj = [];
      await AsyncStorage.setItem('profile', JSON.stringify(obj));
      setProfile(obj);
    } else {
      setProfile(JSON.parse(prof));
    }

    let regData = await AsyncStorage.getItem('RegData');
    if (!regData) {
      let obj = [];
      await AsyncStorage.setItem('profile', JSON.stringify(obj));
      setRegUserData(obj);
    } else {
      setRegUserData(JSON.parse(regData));
    }
  };

  const login = async (payload) => {
    let data = [];
    data.push(payload)
    setProfile(data);
    await AsyncStorage.setItem('profile', JSON.stringify(data));
    return 'Logged out successfully';
  }

  const regProfile = async (payload) => {
    let data = [];
    data.push(payload)
    setProfile(data);
    await AsyncStorage.setItem('profile', JSON.stringify(data));

    let regData = await AsyncStorage.getItem('RegData');
    if(regData === null){
      let newData=[];
      newData.push(payload);
      setRegUserData(newData);
      await AsyncStorage.setItem('RegData', JSON.stringify(newData));
    } else{
      let newData=JSON.parse(regData);
      newData.push(payload);
      setRegUserData(newData);
      await AsyncStorage.setItem('RegData', JSON.stringify(newData));
    }
  }


  const value = {
    profile,
    regUserData,
    loadProfile,
    regProfile,
    login
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
