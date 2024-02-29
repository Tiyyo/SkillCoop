type PlaygroundEntityInterface = {
  id: string;
  name: string;
  address: string;
  city: string;
  post_code: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
};

export class PlaygroundEntity {
  id: string;
  name: string;
  address: string;
  city: string;
  post_code: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;

  constructor({
    id,
    name,
    address,
    city,
    post_code,
    region,
    country,
    latitude,
    longitude,
  }: PlaygroundEntityInterface) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.post_code = post_code;
    this.region = region;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
