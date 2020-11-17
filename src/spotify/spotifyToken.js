import {encode} from 'base-64';
import {CLIENT_ID, CLIENT_SECRET} from '@env';

import {accountSpotifyapiUrl} from '../utils/constants';

const base64Credentials = encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

export default async () => {
  console.log('...Retrieving Token...');
  const apiTokenUrl = `${accountSpotifyapiUrl}/token`;
  const params = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  };

  const {access_token: token} = await fetch(
    apiTokenUrl,
    params,
  ).then((response) => response.json());

  console.log('Your token is: ' + token);
  return token;
};
