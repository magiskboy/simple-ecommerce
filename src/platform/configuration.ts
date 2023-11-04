import * as path from 'path';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

export interface HttpConfig {
  host: string;
  port: number;
}

export interface DatabaseConfig {
  type: 'mysql' | 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export type EnvType = 'local' | 'development' | 'production';

export interface Config {
  env: EnvType;
  http: HttpConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  $all: Config;
}

export interface AuthConfig {
  secret: string;
  expiresIn: string;
}

export interface GeneralConfig {
  name: string;
  version: string;
  description: string;
  contact: {
    name: string;
    email: string;
    url: string;
  };
}

export const loadConfiguration = (): Config => {
  const configPath =
    process.env.SE_CONFIG_PATH || path.join(process.cwd(), 'config.yaml');
  const all = yaml.load(readFileSync(configPath, 'utf8')) as Config;
  return {
    $all: all,
    ...all,
  };
};
