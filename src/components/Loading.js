import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {t} from 'react-native-tailwindcss';

const Loading = () => {
  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default Loading;
