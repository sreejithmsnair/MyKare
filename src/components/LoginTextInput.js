import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import colours from '../globals/colours';
import { getFontontSize } from '../globals/functions';
const windowWidth = Dimensions.get('window').width;
export default function LoginTextInput({
  Width,
  Height,
  Placeholder,
  OnChangeText,
  Border,
  value,
  Error,
  top,
  Length,
  ErrorText,
  KeyboardType,
  secureEntry,
  PhoneCode,
  CurrencyCode,
  ShowValuePlaceHolder,
  BGColor
}) {
  const [secureEntryStatus, setSecureEntryStatus] = React.useState(secureEntry ? true : false);
  const [show, setShow] = React.useState(false);
  return (
    <View style={{height: Height*1.5,  alignItems:'flex-start', justifyContent:'flex-end', }}>
      {/* <View style={{marginLeft: windowWidth*(5/100)}}>
        <Text style={[styles.fontStyle1]}>
          {Placeholder}
        </Text>
      </View> */}
      <View
        style={[styles.container,{height:Height*0.9, borderRadius:5, marginTop:Height/6,  width:windowWidth*(Width/100), backgroundColor: BGColor?BGColor:'transparant',borderBottomWidth:2, borderBottomColor: colours.lowGrey }]}
      > 
      {
        PhoneCode&&(
          <Text style={[styles.fontStyle1,{paddingLeft:20, color: colours.primaryBlack}]}>{"+91 "}</Text>
        )
      }
      {
        CurrencyCode&&(
          <Text style={[styles.fontStyle1,{paddingLeft:10}]}>{"Currency"}</Text>
        )
      }
        <TextInput
          style={{ width: windowWidth * ((Width-18 )/ 100), marginLeft:10, color:colours.primaryBlack, fontFamily: 'Lato-MediumItalic', fontSize: getFontontSize(16),paddingLeft:10,}}
          onChangeText={OnChangeText}
          value={value}
          placeholder={Placeholder}
          placeholderTextColor={colours.primaryGrey}
          maxLength={Length?Length:null}
          secureTextEntry={secureEntryStatus}
          textAlignVertical={top ? 'top' : 'center'}
          keyboardType={KeyboardType?KeyboardType:'default'}
        />
        {secureEntry && (
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              setSecureEntryStatus(!secureEntryStatus);
              setShow(!show);
            }}>
            <Image
              source={show ? require(`../asset/images/eye2.png`):require(`../asset/images/eye1.png`)}
              style={{
                width:windowWidth * (7 / 100),
                height: windowWidth * (7 / 100),
              }}
            />

            {/* <Text>
              {showIcon(
                'eye',
                show ? colours.lightRed : colours.primaryGrey,
                windowWidth * (7 / 100),
              )}
            </Text> */}
          </TouchableOpacity>
        )}
      </View>
      {Error? (
        <Text style={[styles.error, {width: windowWidth * (Width / 105),textAlign:"right"}]}>{ErrorText ? ErrorText : "*Required"}</Text>
      )
      :
      <Text style={[styles.error, {width: windowWidth * (Width / 105),textAlign:"right"}]}></Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center', 
    marginBottom:5
  },
  error: {
    color: colours.primaryRed,
    marginTop: '1%',
    paddingLeft: '1%',
    fontFamily: 'Lato-Italic',
    fontSize: getFontontSize(14),
  },
  fontStyle1: {
    color: colours.lightBlue,
    fontFamily: 'Lato-MediumItalic',
    fontSize: getFontontSize(14),
  }
});
