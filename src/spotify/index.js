import React, {createContext, useContext, useEffect, useState} from 'react';

import {apiUrl} from '../utils/constants';
import currentCountryCode from './currentCountryCode';
import spotifyToken from './spotifyToken';

const SpotifyContext = createContext();

const SpotifyProvider = ({children}) => {
  const [token, setToken] = useState(undefined);
  const [countryCode, setCountryCode] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const _token = await spotifyToken();
      const _countryCode = await currentCountryCode();
      setToken(_token);
      setCountryCode(_countryCode);
      setLoading(false);
    })();
  }, []);

  return (
    <SpotifyContext.Provider value={{loading, token, countryCode}}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotifyToken = () => {
  const {loading, token, countryCode} = useContext(SpotifyContext);
  return {loading, token, countryCode};
};

export const useSpotifyPlaylists = () => {
  const {token, countryCode} = useSpotifyToken();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await fetch(
        `${apiUrl}/browse/featured-playlists?country=${countryCode}`,
        params,
      ).then((response) => response.json());
      setPlaylists(data?.playlists?.items);
      setLoading(false);
    })();
  }, [token, countryCode]);

  return {
    loading,
    playlists,
  };
};

export const useSpotifyPlaylistTracks = (url) => {
  const {token} = useSpotifyToken();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await fetch(url, params).then((response) => response.json());
      setTracks(data?.items);
      setLoading(false);
    })();
  }, [token, url]);

  return {
    loading,
    tracks,
  };
};

export default SpotifyProvider;
