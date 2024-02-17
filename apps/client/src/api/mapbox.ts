import axios from 'axios';

const API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

export const api = axios.create({
  baseURL: 'https://api.mapbox.com/',
});

export const getGeoCodingFn = async (query: string) => {
  const response = await api.get(
    `geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`,
  );
  return response.data;
};

export const getReverseGeoCodingCountryFn = async (
  longitude: number,
  latitude: number,
) => {
  const response = await api.get(
    /*eslint-disable-next-line */
    `geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${API_KEY}`,
  );
  if (response.data.features) {
    const place = response.data.features.find((ctx: any) =>
      ctx.id.includes('country'),
    );
    return place.place_name as string;
  }
};
