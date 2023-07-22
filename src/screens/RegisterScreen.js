import React, { useRef } from 'react';
import {SafeAreaView, StyleSheet, Modal, View, Text, ImageBackground, Dimensions, Platform, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Linking} from 'react-native';
import colours from '../globals/colours';
import { getFontontSize } from '../globals/functions';
import AuthButton from '../components/AuthButton';
import LoginTextInput from '../components/LoginTextInput';
import Toast from 'react-native-toast-message';
import { LoaderContext } from '../Context/loaderContext';
import { AppContext } from '../Context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = ({navigation}) => {

  const { showLoader } = React.useContext(LoaderContext);
  const { regProfile, regUserData } = React.useContext(AppContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('')

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [nameErrorsMessage, setNameErrorMessage] = React.useState('false');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [phoneErrorMessage,setPhoneErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');



  const handleRegister = async () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const NameError = name.trim() === '';
    const PhoneError = phone.trim() === '';
    const phoneTypeError = !phone.match(phoneno);
    const PasswordErrror = password.length < 6;
    const EmailError = email.trim() === '';
    const EmailTypeError = !email.match(mailformat);
  
    if (!EmailError) {
      if (!email.match(mailformat)) {
        setEmailErrorMessage('Enter a valid email ID');
        setEmailError(true);
      } else {
        let obj = regUserData && regUserData.find(obj =>( obj.custEmail == email ))
        if(obj && obj.custEmail === email){
          setEmailError(true);
          setEmailErrorMessage('Email already exist.')
        }
      }
    } else if (emailError) {
      setEmailErrorMessage('Required');
      setEmailError(true);
    }

    if (!PhoneError) {
      if (!phone.match(phoneno)) {
        setPhoneErrorMessage('Enter Valid Mobile');
        setPhoneError(true);
      } else{
        let obj = regUserData && regUserData.find(obj =>( obj.custPhone == phone ))
        if(obj && obj.custPhone === phone){
        setPhoneError(true);
        setPhoneErrorMessage('Phone number already exist.')
      }
    }
    } else if (phoneError) {
      setPhoneErrorMessage('*Required');
      setPhoneError(true);
    }

    if (
      !(
        nameError ||
        NameError ||
        emailError ||
        EmailError ||
        phoneError ||
        PhoneError ||
        PasswordErrror ||
        EmailTypeError ||
        phoneTypeError 
      )
    ) {
      let data = {
        custName:name,
        custEmail:email,
        custPhone:phone,
        custPassword:password,
      }
      try {
        await regProfile(data);
        Toast.show({
          type: 'success',
          text1: `Hey ${name}`,
          text2: `Welcome  👋`
        });
        await AsyncStorage.setItem('isOpenedBefore', 'true');
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } catch (error) {
        console.log(error)
        showLoader(false);
        Toast.show({
          type: 'error',
          text1: 'Hey',
          text2: 'Something Went Wrong'
        });
      }
    } else {
      setNameErrorMessage('Required');
      setPasswordErrorMessage('Minimum 6 Char');
      setNameError(nameError);
      setPasswordError(PasswordErrror);
    }
  };

  const phoneExistCheck = async(value) => {
    setPhone(value);
    setPhoneError(false);
    let obj = regUserData && regUserData.find(obj =>( obj.custPhone == value ))
    if(obj && obj.custPhone === value){
      setPhoneError(true);
      setPhoneErrorMessage('Phone number already exist.')
      
    }
  }

  const emailExistCheck = async(value) => {
    setEmail(value);
    setEmailError(false);
    let obj = regUserData && regUserData.find(obj =>( obj.custEmail == value ))
    if(obj && obj.custEmail === value){
      setEmailError(true);
      setEmailErrorMessage('Email already exist.')
      
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.buttonContainer,{justifyContent:'space-between'}]}>
          <TouchableOpacity style={[styles.topButton,{borderTopLeftRadius: 10,borderBottomRightRadius: 10}]}
            onPress={() => navigation.goBack()}
          >
          <Text style={styles.fontStyle5}>{'Back'}</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../asset/logo/mykareLogo.png')}
          style={{
            height: windowWidth * (15 / 100),
            width: windowWidth * (40 / 100),
            resizeMode: 'contain',
          }}
        />
        <LoginTextInput
          OnChangeText={(text) => {
            setName(text);
            setNameError(false);
          }}
          Width={80}
          Placeholder={'Full Name'}
          value={name}
          Error={nameError}
          ErrorText={nameErrorsMessage}
          Height={windowWidth * (14 / 100)}
        />
        <LoginTextInput
          OnChangeText={(text) => emailExistCheck(text)}
          Width={80}
          Placeholder={'Email ID'}
          value={email}
          Error={emailError}
          ErrorText={emailErrorMessage}
          Height={windowWidth * (14 / 100)}
        />
        <LoginTextInput
          OnChangeText={(text) => phoneExistCheck(text)}
          Width={80}
          Placeholder={'Phone No'}
          value={phone}
          KeyboardType={'number-pad'}
          Length={10}
          PhoneCode={phone ==''?null: isNaN(phone.charAt(0))?false:true}
          Error={phoneError}
          ErrorText={phoneErrorMessage}
          Height={windowWidth * (14 / 100)}
        />
        <LoginTextInput
          OnChangeText={(text) => {
            setPassword(text);
            setPasswordError(false);
          }}
          Width={80}
          Placeholder={'Password'}
          value={password}
              PhoneCode={email ==''?null: isNaN(email.charAt(0))?false:true}
          Error={passwordError}
          ErrorText={passwordErrorMessage}
          Height={windowWidth * (14 / 100)}
          secureEntry
        />
        <View style={styles.buttonContainer}>
          <AuthButton
            OnPress={()=>handleRegister()}
            ButtonText={'Create Account'}
            ButtonWidth={80}
          />
        </View>
        <TouchableOpacity style={{flexDirection: 'row', width:'90%',marginTop: windowHeight*(5/100)}} onPress={()=>navigation.goBack()}> 
          <View style={{backgroundColor: colours.lowGrey, height: 2, flex: 1, alignSelf: 'center'}} /> 
            <Text style={[styles.fontStyle3,{color:colours.primaryColor}]}>{'Alredy Have Account'}</Text>
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
    flex: 1,
    backgroundColor: colours.primaryWhite,
    paddingTop: windowHeight*(5/100)
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    alignItems:'center',
    justifyContent:'center',
  },
  innerContainer: {
    width: windowWidth*(85/100),
    height: windowHeight*(75/100),
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonContainer:{
    flexDirection:'row',
    width: windowWidth*(85/100),
    justifyContent:'space-around',
    marginTop: 10
  },
  absolute: {
    width: windowWidth*(85/100),
    height: windowHeight*(75/100),
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:10,
    // position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  topButton: {
    paddingVertical:5,
    paddingHorizontal:15,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colours.lightRed
  },
  optionModalView: {
    height: windowHeight * (45 / 100),
    marginTop: windowHeight * (55 / 100),
    paddingTop: windowHeight * (1 / 100),
    paddingBottom: windowHeight * (2 / 100),
    backgroundColor: colours.primaryWhite,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    elevation: 10,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
    width: windowWidth*(90/100),
    height: windowHeight*(7/100),
    marginBottom:10,
    borderBottomWidth:0.5,
    borderBottomColor: colours.lowGrey
  },
  underlineStyleBase: {
    color: colours.lightRed,
    fontFamily:'Lato-BoldItalic',
    fontSize: getFontontSize(15),
    width:windowWidth*(15/100),
    height:windowWidth*(10/100),
    borderWidth:0,
    borderBottomWidth:2,
    borderRadius:5,
    borderColor: colours.lightRed,
  },
  underlineStyleHighLighted: {
    borderColor: colours.lightRed,
  },
  fontStyle1: {
    fontSize:getFontontSize(24),
    color: colours.primaryGrey,
    fontFamily: 'Lato-Bold',
    paddingVertical:10
  },
  fontStyle2: {
    fontSize:getFontontSize(16),
    color: colours.primaryGrey,
    fontFamily: 'Lato-Italic',
    paddingTop:5,
    paddingBottom:20
  },
  fontStyle3: {
    fontSize:getFontontSize(16),
    color: colours.primaryGrey,
    fontFamily: 'Lato-BoldItalic',
  },
  fontStyle4: {
    fontSize:getFontontSize(12),
    color: colours.primaryGrey,
    fontFamily: 'Lato-Italic',
    padding:5,
  },
  fontStyle5: {
    fontSize:getFontontSize(16),
    color: colours.lightRed,
    fontFamily: 'Lato-MediumItalic',
  },
});

export default RegisterScreen;