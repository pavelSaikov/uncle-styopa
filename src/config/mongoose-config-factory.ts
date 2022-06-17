import { ConfigService } from '@nestjs/config';

import { EnvVariable } from 'src/models';

export const mongooseConfigFactory = (config: ConfigService) => {
  const user = config.get<string>(EnvVariable.DB_USERNAME);
  const pass = config.get<string>(EnvVariable.DB_PASSWORD);
  const host = config.get<string>(EnvVariable.DB_HOST);
  const port = config.get<string>(EnvVariable.DB_PORT);
  const dbName = config.get<string>(EnvVariable.DB_DATABASE);
  const authSource = config.get<string>(EnvVariable.DB_AUTH_SOURCE);

  const uri = `mongodb://${user}:${pass}@${host}:${port}`;

  return {
    uri,
    dbName,
    authSource,
  };
};
