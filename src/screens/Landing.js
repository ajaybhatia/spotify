import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {t} from 'react-native-tailwindcss';

const Landing = () => {
  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
      <Image
        source={require('../assets/images/logo.png')}
        style={[t.h45, t.w45]}
        resizeMode="cover"
      />
      <Text style={[t.mT5]}>Preparing Spotify for you...</Text>
      <ActivityIndicator style={[t.mT2]} size="large" color="blue" />
    </View>
  );
};

export default Landing;
