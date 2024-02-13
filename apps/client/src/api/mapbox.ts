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
