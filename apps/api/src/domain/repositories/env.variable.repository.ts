export abstract class EnvVariableRepository {
  abstract getEnvVariable(name: string): string;
  abstract getClientUrl(): string;
  abstract getApiUrl(): string;
  abstract getHost(): string;
  abstract isProduction(): boolean;
}
