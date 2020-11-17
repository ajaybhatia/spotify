import React from 'react';
import {Pressable, View, Text, Image} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/Ionicons';

const Card = ({
  imageUrl,
  heading = '',
  subheading = '',
  caption = '',
  onPress,
}) => {
  return (
    <Pressable
      style={[t.flexRow, t.mX2, t.mY1, t.roundedLg, t.shadow, t.bgWhite]}
      onPress={onPress}>
      <View style={[t.h25, t.w25, t.roundedLg]}>
        {imageUrl && (
          <Image
            resizeMode="cover"
            style={[
              t.flex1,
              t.roundedLg,
              {height: undefined, width: undefined},
            ]}
            source={{uri: imageUrl}}
          />
        )}
      </View>
      <View style={[t.flex1, t.p2]}>
        <View style={[t.flex1]}>
          <Text style={[t.textBase, t.fontBold]}>{heading}</Text>
          <Text style={[t.textXs, t.mT2]}>{subheading}</Text>
        </View>
        <View>
          <Text style={[t.textXs, t.fontBold]}>{caption}</Text>
        </View>
      </View>
      <View
        style={[
          t.justifyAround,
          t.itemsCenter,
          t.roundedTrLg,
          t.roundedBrLg,
          t.w15,
          t.bgBlue500,
        ]}>
        <Icon
          name="ios-arrow-forward-circle-outline"
          style={[t.text2xl, t.textWhite]}
        />
      </View>
    </Pressable>
  );
};

export default Card;
