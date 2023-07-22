import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colours from '../globals/colours';
import { AppContext } from '../Context/appContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SplashScreen = ({ navigation, route }) => {

const {loadProfile,} = React.useContext(AppContext);
  React.useEffect(() => {
    const asynceffect = async () => {
      await loadProfile();
        let iop = await AsyncStorage.getItem('isOpenedBefore');
        if(iop == 'true'){
          setTimeout(function () {
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            }) 
          }, 3000)
        } else{
          setTimeout(function () {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            }) 
          }, 3000)
        }
    }
    asynceffect();
  }, []);

  return (
    <SafeAreaView  style={styles.container}>
      <Image
        source={require('../asset/logo/Splash.jpg')}
        style={{
          height: windowHeight,
          width: windowWidth,
          resizeMode: 'contain',
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colours.primaryColor,
    flex: 1,
    paddingTop: windowHeight*(5/100)
  },
  });