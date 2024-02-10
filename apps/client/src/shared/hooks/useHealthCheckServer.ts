import { useEffect } from 'react';
import { SERVER_URL } from '../../utils/server';

export function useHealthCheckServer() {
  const fetchServerUrl = async () => {
    const res = await fetch(SERVER_URL + '/check');
    const data = await res.json();
    console.log(
      'Health check server url from environement:',
      data.message ?? 'NOT OK',
    );
  };
  useEffect(() => {
    fetchServerUrl();
  }, []);
}
