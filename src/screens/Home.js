import React from 'react';
import {ScrollView} from 'react-native';
import {t} from 'react-native-tailwindcss';

import {useSpotifyPlaylists} from '../spotify';

import Loading from '../components/Loading';
import Playlist from '../components/Card';

const Home = ({navigation}) => {
  const {loading, playlists} = useSpotifyPlaylists();

  return (
    <ScrollView contentContainerStyle={[t.flexGrow]}>
      {loading ? (
        <Loading />
      ) : (
        playlists?.map(({id, name, description, images, tracks}) => (
          <Playlist
            key={id}
            imageUrl={images[0]?.url}
            heading={name}
            subheading={description}
            caption={`${tracks?.total} Tracks`}
            onPress={() => navigation.navigate('Tracks', {url: tracks?.href})}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Home;
