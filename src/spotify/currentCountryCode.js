import {ipInfoUrl} from '../utils/constants';

export default async () => {
  const {countryCode} = await fetch(ipInfoUrl).then((response) =>
    response.json(),
  );
  return countryCode;
};
