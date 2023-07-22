import React from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View, Image, TouchableOpacity, Text, Modal} from 'react-native';
import { AppContext } from '../Context/appContext';
import { LoaderContext } from '../Context/loaderContext';
import AuthButton from '../components/AuthButton';
import showIcon from '../globals/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import colours from '../globals/colours';
import { getFontontSize } from '../globals/functions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const HomeScreen = ({navigation}) => {

  const { profile } = React.useContext(AppContext);
  const { showLoader } = React.useContext(LoaderContext);
  const [viewStatus, setViewStatus] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);

  const funLogout = async() => {
    await AsyncStorage.removeItem('profile');
    Toast.show({
      type: 'success',
      text1: `Hey`,
      text2: 'Logged out successfully'
    });
    await AsyncStorage.removeItem('isOpenedBefore');
    setAlertModal(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.headerStyle}
      >
        <Image
          source={ require('../asset/logo/mykareLogo.png')}
          style={styles.avtrImage}
        />
        <TouchableOpacity style={styles.hNameContainer}>
          <Text style={styles.fontStyle4}>Hello</Text>
          <Text style={styles.fontStyle1}>{profile.length>0&&profile[0].custName?profile[0].custName:'Buddy'}</Text>
        </TouchableOpacity>
        <View style={styles.hIconContainer}>
          <TouchableOpacity onPress={()=>setAlertModal(true)}>
            <Image
              source={require(`../asset/images/logout.png`)}
              style={styles.iconImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      {
        viewStatus&&(
          <View style={{
            borderWidth:1,
            borderColor: colours.secondaryColor,
            alignItems:'center',
            padding: 20,
            borderRadius:20,
          }}>
            <Text style={styles.fontStyle3}>Name : {profile[0].custName}</Text>
            <Text style={styles.fontStyle3}>Email ID : {profile[0].custEmail}</Text>
            <Text style={styles.fontStyle3}>Phone number : {profile[0].custPhone}</Text>
          </View>
        )
      }

      <AuthButton
        OnPress={()=>setViewStatus(!viewStatus)}
        ButtonText={viewStatus?'Hide Details' : 'View Details'}
        ButtonWidth={80}
      />
      <Modal
        animationType="slide"
        visible={alertModal}
        transparent={true}
      >
        <View style={{width:windowWidth, height: windowHeight, backgroundColor: 'rgba(100, 100, 100,0.3)'}}>
          <View style={[styles.optionModalView,{height: windowHeight * (35 / 100),marginTop: windowHeight * (65 / 100),}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.fontStyle4,{color:colours.lightRed}]}>Logout</Text>
              <TouchableOpacity onPress={()=>setAlertModal(false)} style={{
                width: windowWidth*(10/100),
                height: windowWidth*(10/100),
              }}>
                <View>{showIcon('close',colours.lightRed ,windowWidth * (6 / 100))}</View>
              </TouchableOpacity>
            </View>
            <Text style={styles.fontStyle2}>
              Are you sure that you want to logout? You will need to login again if you wish to.
            </Text>
            <View style={styles.buttonContainer}>
              <AuthButton
                OnPress={() => setAlertModal(false)}
                ButtonText={"Cancel"}
                ButtonWidth={40}
              />
              <AuthButton
                OnPress={() => funLogout()}
                ButtonText={'Proceed'}
                ButtonWidth={40}
              />
            </View>
            
          </View> 
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'space-between',
    flex: 1,
    backgroundColor: colours.primaryWhite,
    paddingTop: windowHeight*(2/100)
  },
  headerStyle: {
    width: windowWidth*(90/100),
    height: windowHeight*(10/100),
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hNameContainer:{
    width: windowWidth*(35/100),
    height: windowHeight*(8/100),
    justifyContent:'center'
  },
  hIconContainer:{
    width: windowWidth*(35/100),
    height: windowHeight*(8/100),
    justifyContent:'flex-end',
    alignItems:'center',
    flexDirection:'row',
  },
  iconImageStyle: {
    height: windowWidth*(12/100),
    width: windowWidth*(12/100),
    resizeMode: 'contain',
  },
  avtrImage: {
    height: windowHeight*(6/100),
    width: windowHeight*(6/100),
    borderRadius: windowHeight*(1/100),
    backgroundColor: colours.primaryBlack,
    resizeMode: 'contain',
  },
  optionModalView: {
    height: windowHeight * (75 / 100),
    marginTop: windowHeight * (25 / 100),
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
  buttonContainer:{
    marginTop: windowHeight*(5/100),
    flexDirection:'row',
    width: windowWidth*(85/100),
    justifyContent:'space-around'
  },
  fontStyle1: {
    fontSize:getFontontSize(20),
    color: colours.primaryGrey,
    fontFamily: 'Lato-Bold',
  },
  fontStyle2: {
    fontSize:getFontontSize(16),
    color: colours.primaryGrey,
    fontFamily: 'Lato-Italic',
    width: windowWidth*(80/100),
    textAlign:'center'
  },
  fontStyle3: {
    fontSize:getFontontSize(16),
    color: colours.primaryGrey,
    fontFamily: 'Lato-BoldItalic',
    paddingVertical: 10,
    width: windowWidth*(80/100),
    textAlign:'center',
  },
  fontStyle4: {
    fontSize:getFontontSize(16),
    color: colours.primaryGrey,
    fontFamily: 'Lato-MediumItalic',
  },
  fontStyle5: {
    fontSize:getFontontSize(14),
    color: colours.primaryGrey,
    fontFamily: 'Lato-Medium',
  },
});

export default HomeScreen;