//global colours
const mainColours = {
  primaryColor: '#072f40',
  secondaryColor: '#00cfb0',

  primaryPink: '#FF326D',
  lightPink: '#EDE9EF',

  primaryOrange: '#F1A035',
  lightOrange: '#f0b15d',
  lowOrange: '#fadfbb',


  primaryBlue:'#162974',
  lightBlue:'#5b7fba',
  lowBlue:'#E8EEFF',
  darkBlue:'#1B243D',


  primaryWhite: '#ffffff',
  lightWhite: '#e3e3e3',
  lowWhite: '#faf7f7',

  primaryBlack: '#151515',
  primaryGrey: '#70726F',
  lightGrey: '#adadad',
  lowGrey: '#DADFEC',

  primaryYellow: '#ccb802',

  primaryGreen: '#44B74B',
  lightGreen: '#83de88',
  lowGreen: '#c6f7c9',
  
  primaryRed: "#D71920",
  lightRed: '#11b08e',
  // lightRed: '#F97C80',
  // lowRed: '#FBE0E1',
  lowRed: '#bfe0c0',

};
const colours = {
  ...mainColours,
  authScreens: {
    background: mainColours.whiteBackground,
    text: mainColours.secondaryColor,
    primaryBtn: mainColours.primaryColor,
    secondaryBtn: mainColours.secondaryColor,
  },
};

export default colours;
