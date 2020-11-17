import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';
import moment from 'moment';

const Player = ({url}) => {
  const [playing, setPlaying] = React.useState(false);
  const [track, setTrack] = React.useState();
  const [seek, setSeek] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    let sound = new Sound(url, null, (error) => {
      setTrack(sound);
      setLoading(false);
    });

    return () => (sound = null);
  }, [url]);

  React.useEffect(() => {
    if (!playing) {
      return;
    }

    const id = setInterval(() => {
      setSeek((_seek) => _seek + 1);
    }, 1000);
    return () => {
      clearInterval(id);
      setSeek(0);
    };
  }, [playing]);

  return (
    <View style={styles.player}>
      <View>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator />
          </View>
        ) : playing ? (
          <TouchableOpacity
            onPress={() => {
              track?.stop(() => {
                setPlaying(false);
              });
            }}>
            <Icon name="stop-circle" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              setPlaying(true);
              track?.play(() => {
                track?.stop(() => {
                  setPlaying(false);
                });
              });
            }}>
            <Icon name="play-circle" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0}
          maximumValue={track?.getDuration()}
          value={seek}
          step={1}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#ddd"
          onValueChange={(value) => {
            setSeek(value);
            track.setCurrentTime(value);
          }}
        />
        <Text style={styles.timer}>
          {moment
            .utc(moment.duration(seek, 'seconds').asMilliseconds())
            .format('mm:ss')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    height: 30,
    width: 30,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    backgroundColor: '#555',
    borderRadius: 99999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  icon: {
    color: '#fff',
    margin: 5,
    fontSize: 28,
  },
  sliderContainer: {
    flex: 1,
    marginTop: 15,
  },
  timer: {
    color: '#fff',
    fontSize: 10,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 2,
  },
});

export default Player;
