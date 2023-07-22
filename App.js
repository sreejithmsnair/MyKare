import React, { Component } from 'react';
import { StatusBar, Alert, Linking, StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigators/RootNavigator';
import { AppContextProvider } from './src/Context/appContext';
import { LoaderContextProvider } from './src/Context/loaderContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { getFontontSize } from './src/globals/functions';

const App = () => {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: getFontontSize(16),
          fontFamily: 'Lato-MediumItalic'
        }}
        text2Style={{
          fontSize: getFontontSize(14),
          fontFamily: 'Lato-Italic'
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: getFontontSize(16),
          fontFamily: 'Lato-MediumItalic'
        }}
        text2Style={{
          fontSize: getFontontSize(14),
          fontFamily: 'Lato-Italic'
        }}
      />
    ),
  };

  return (
    <AppContextProvider>
      <LoaderContextProvider>
        <MyStatusBar backgroundColor='#072f40' barStyle="light-content" />
          <NavigationContainer>
            <RootNavigator />
            <Toast config={toastConfig} />
        </NavigationContainer>
      </LoaderContextProvider>
    </AppContextProvider>
  );
};

export default App;


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#d40086',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#d40086',
  },
});