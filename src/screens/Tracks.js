import React from 'react';
import {ScrollView} from 'react-native';
import {t} from 'react-native-tailwindcss';

import {useSpotifyPlaylistTracks} from '../spotify';

import Loading from '../components/Loading';
import Track from '../components/Card';

const Tracks = ({navigation, route}) => {
  const {
    params: {url},
  } = route;

  const {loading, tracks} = useSpotifyPlaylistTracks(url);

  return (
    <ScrollView contentContainerStyle={[t.flexGrow]}>
      {loading ? (
        <Loading />
      ) : (
        tracks?.map(
          ({
            track: {
              id,
              name,
              album: {images, name: albumName, artists},
              duration_ms,
              preview_url,
            },
          }) => (
            <Track
              key={id}
              imageUrl={images[0]?.url}
              heading={name}
              caption={artists
                ?.map(({name: artistName}) => artistName)
                ?.join(', ')}
              onPress={() =>
                navigation.navigate('Details', {
                  name,
                  images,
                  artists,
                  albumName,
                  duration_ms,
                  preview_url,
                })
              }
            />
          ),
        )
      )}
    </ScrollView>
  );
};

export default Tracks;
