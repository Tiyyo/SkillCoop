const mapboxKeyIds = {
  postcode: 'postcode',
  city: 'place',
  region: 'region',
  country: 'country',
} as const;

export function extractLocationInfosMapboxApi(feature: any): any {
  return {
    name: feature.text,
    address: feature.properties.address,
    post_code: feature.context.find((c: any) =>
      c.id.includes(mapboxKeyIds.postcode),
    )?.text,
    city: feature.context.find((c: any) => c.id.includes(mapboxKeyIds.city))
      ?.text,
    region: feature.context.find((c: any) => c.id.includes(mapboxKeyIds.region))
      ?.text,
    country: feature.context.find((c: any) =>
      c.id.includes(mapboxKeyIds.country),
    )?.text,
    longitude: feature.center[0],
    latitude: feature.center[1],
  };
}
