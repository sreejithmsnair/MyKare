import React, { useRef } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions, Linking, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Modal} from 'react-native';

import colours from '../globals/colours';
import { getFontontSize } from '../globals/functions';
import AuthButton from '../components/AuthButton';
import LoginTextInput from '../components/LoginTextInput';
import { AppContext } from '../Context/appContext';
import { LoaderContext } from '../Context/loaderContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {

  const { login, profile, regUserData } = React.useContext(AppContext);
  const { showLoader } = React.useContext(LoaderContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleLogin = async () => {
    const EmailError = email === '';
    const PasswordError = password === '';
    if (!(EmailError || PasswordError)) {
      try {
        let value = regUserData && regUserData.find(obj =>( obj.custEmail == email || obj.custPhone == email))
        if(value){
          if(value.custPassword === password){
            showLoader(true);
            let reg = await login(value);
            Toast.show({
              type: 'success',
              text1: `Welcome Back ${value.custName}`,
              text2: reg
            });
            await AsyncStorage.setItem('isOpenedBefore', 'true');
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
            showLoader(false);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Oh No',
              text2: 'Password mismatch'
            });
            showLoader(false);
          }
        } else{
          Toast.show({
            type: 'error',
            text1: 'Oh No',
            text2: 'There is no user found.'
          });
          showLoader(false);
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'OhNo',
          text2: error
        });
        showLoader(false);
      }
    } else {
      setEmailError(EmailError);
      setPasswordError(PasswordError);
      setEmailErrorMessage('*Required');
      setPasswordErrorMessage('*Required');
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerContainer}>
            <Image
              source={require('../asset/logo/mykareLogo.png')}
              style={styles.image}
            />
            <Text/>
            <LoginTextInput
              OnChangeText={(text) => {
                setEmail(text);
                setEmailError(false);
              }}
              Width={80}
              Placeholder={'Enter Phone NumberOrEmail'}
              value={email}
              Error={emailError}
              PhoneCode={email ==''?null: isNaN(email.charAt(0))?false:true}
              ErrorText={emailErrorMessage}
              Height={windowWidth * (14 / 100)}
            />
            <LoginTextInput
              OnChangeText={(text) => {
                setPassword(text);
                setPasswordError(false);
              }}
              Width={80}
              Placeholder={'Enter Password'}
              value={password}
              Error={passwordError}
              ErrorText={passwordErrorMessage}
              Height={windowWidth * (14 / 100)}
              secureEntry
            />

            <View style={styles.buttonContainer}>
              <AuthButton
                OnPress={()=>handleLogin()}
                ButtonText={'Sign In'}
                ButtonWidth={80}
              />
            </View>

            <TouchableOpacity style={{flexDirection: 'row', width:'90%', marginTop:'10%'}} onPress={()=>navigation.navigate('RegisterScreen')}> 
              <View style={{backgroundColor: colours.lowGrey, height: 2, flex: 1, alignSelf: 'center'}} /> 
                <Text style={styles.fontStyle3}>Create An Account</Text>
              <View style={{backgroundColor: colours.lowGrey, height: 2, flex: 1, alignSelf: 'center'}} /> 
            </TouchableOpacity>

          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    backgroundColor: colours.primaryWhite,
    flex: 1,
    paddingTop: windowHeight*(5/100)
  },
  image: {
    height: windowWidth * (15 / 100),
    width: windowWidth * (40 / 100),
    resizeMode: 'contain',
  },
  innerContainer: {
    width: windowWidth*(85/100),
    height: windowHeight*(70/100),
    alignItems:'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  buttonContainer:{
    flexDirection:'row',
    width: windowWidth*(85/100),
    justifyContent:'space-around'
  },
  fontStyle2: {
    fontSize:getFontontSize(16),
    color: colours.primaryColor,
    fontFamily: 'Lato-Italic',
    paddingTop:5,
    paddingBottom:20
  },
  fontStyle3: {
    fontSize:getFontontSize(16),
    color: colours.primaryColor,
    fontFamily: 'Lato-BoldItalic',
    paddingHorizontal:5,
  },
});

export default LoginScreen;