export abstract class PlagroundRepository {
  abstract search(
    query: string,
  ): Promise<{ id: string; name: string; city: string }[]>;
}
