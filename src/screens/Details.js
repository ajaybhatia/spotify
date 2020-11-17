import React from 'react';
import {View, Text, Image} from 'react-native';
import {t} from 'react-native-tailwindcss';

import Player from '../components/Player';

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const Details = ({route}) => {
  const {
    params: {name, images, artists, albumName, duration_ms, preview_url},
  } = route;

  return (
    <View style={[t.flex1, t.justifyEvenly]}>
      <View style={[t.p8]}>
        <Text style={[t.text3xl, t.fontBold, t.textCenter]}>{name}</Text>
      </View>
      <Image
        source={{uri: images[0]?.url}}
        style={[t.h80, t.w80, t.roundedLg, t.selfCenter]}
        resizeMode="cover"
      />
      <View style={[t.p4, t.itemsCenter]}>
        <View style={[t.itemsCenter]}>
          <Text style={[t.italic]}>from</Text>
          <Text style={[t.text2xl]}>{albumName}</Text>
        </View>
        <View style={[t.mT3, t.itemsCenter]}>
          <Text style={[t.italic]}>by</Text>
          <Text style={[t.textBase]}>
            {artists?.map(({name: artistName}) => artistName).join(',')}
          </Text>
        </View>
        <View style={[t.mT3, t.itemsCenter]}>
          <Text style={[t.italic]}>Duration</Text>
          <View style={[t.bgRed600, t.pX2, t.roundedFull]}>
            <Text style={t.textWhite}>
              {millisToMinutesAndSeconds(duration_ms)}
            </Text>
          </View>
        </View>
      </View>
      <View style={[t.pX10]}>
        <Player url={preview_url} />
      </View>
    </View>
  );
};

export default Details;
