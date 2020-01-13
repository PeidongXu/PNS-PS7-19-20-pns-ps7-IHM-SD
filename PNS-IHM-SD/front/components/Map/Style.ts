import {StyleSheet, Dimensions} from 'react-native';
import { forFadeFromBottomAndroid } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/CardStyleInterpolators';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height-10,
    },
    paragraph: {
      marginTop: 500,
      fontSize: 18,
      textAlign: 'center',
    },
    placeList: {
      flex: 1,
      justifyContent: "center",
    }
  });