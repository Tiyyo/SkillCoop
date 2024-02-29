export abstract class EnvVariableRepository {
  abstract getEnvVariable(name: string): string;
}
