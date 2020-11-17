import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useSpotifyToken} from '../spotify';

import Landing from '../screens/Landing';
import Home from '../screens/Home';
import Tracks from '../screens/Tracks';
import Details from '../screens/Details';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  const {loading} = useSpotifyToken();

  if (loading) {
    return <Landing />;
  }

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Tracks" component={Tracks} />
        <Screen
          options={({route}) => ({
            headerTitle: route?.params?.name,
          })}
          name="Details"
          component={Details}
        />
      </Navigator>
    </NavigationContainer>
  );
};
